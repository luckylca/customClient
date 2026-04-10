import type { Plugin } from 'vite';
import { spawn, execSync } from 'child_process';
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const electronPath = require('electron') as string;

const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
const dependencies = Object.keys(pkg.dependencies || {});

// 1. 异步构建，并将输出改为 CommonJS 规范的 .cjs 文件
const buildBackground = async () => {
    await esbuild.build({
        entryPoints: [path.resolve(process.cwd(), 'src/background.ts')],
        bundle: true,
        // 关键修复：输出为 .cjs 文件，完美避开 package.json 中的 "type": "module" 冲突
        outfile: path.resolve(process.cwd(), 'dist/background.cjs'), 
        platform: 'node',
        format: 'cjs', 
        alias: {
            'protobufjs/minimal': 'protobufjs/minimal.js',
        },
        external: ['electron', ...dependencies],
    });
};

const isMainProcessSource = (filePath: string) => {
    const rel = path.relative(process.cwd(), filePath).split(path.sep).join('/');
    return rel.startsWith('src/background') || rel.startsWith('src/services/');
};

export const ElectronDevPlugin = (): Plugin => {
    let electronProcess: ReturnType<typeof spawn> | null = null;

    // 2. 跨平台兼容的进程清理
    const stopElectron = () => {
        if (!electronProcess) return;

        try {
            if (process.platform === 'win32' && electronProcess.pid) {
                // Windows：使用 taskkill 强制杀死整个进程树，防止端口占用和僵尸进程
                execSync(`taskkill /pid ${electronProcess.pid} /T /F`, { stdio: 'ignore' });
            } else {
                // macOS / Linux：主进程可以正常响应 kill 信号并带走子进程
                electronProcess.kill();
            }
        } catch (e) {
            // 忽略销毁时的错误，防止影响重启流程
        }
        electronProcess = null;
    };

    const startElectron = (devUrl: string) => {
        stopElectron();
        // 关键修复：启动刚刚打包好的 .cjs 文件
        electronProcess = spawn(electronPath, [path.resolve(process.cwd(), 'dist/background.cjs'), devUrl], {
            stdio: 'inherit',
            env: {
                ...process.env,
                VITE_DEV_SERVER_URL: devUrl,
            },
        });
    };

    return {
        name: 'vite:electron-dev',
        configureServer(server) {
            server.httpServer?.on('listening', async () => {
                const address = server.httpServer?.address();
                if (!address || typeof address === 'string') return;

                const devUrl = server.resolvedUrls?.local?.[0] ?? `http://localhost:${address.port}`;
                
                // 等待主进程构建完成后再启动 Electron
                await buildBackground();
                startElectron(devUrl);

                server.watcher.on('change', async (changedFile) => {
                    if (!isMainProcessSource(changedFile)) return;
                    await buildBackground();
                    startElectron(devUrl);
                });

                // 注册进程退出时的清理回调
                const cleanup = () => stopElectron();
                process.once('exit', cleanup);
                process.once('SIGINT', cleanup);
                process.once('SIGTERM', cleanup);
            });
        }
    }
}