import { AddressInfo } from 'net';
import type { Plugin } from 'vite';
import { spawn } from 'child_process';
import esbuild from 'esbuild';
import * as electronBuilder from 'electron-builder';
import fs from 'fs';
import path from 'path';
const buildBackground = () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const dependencies = Object.keys(pkg.dependencies || {});

    esbuild.buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        format: 'esm',
        external: ['electron', ...dependencies],
    });
};

export const ElectronBuildPlugin = (): Plugin => {
    return {
        name: 'vite:electron-build',
        closeBundle() {
            buildBackground();
            const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
            json.main = 'dist/background.js';
            // 只保留生产依赖（dependencies）
            const prodJson = {
                name: json.name,
                version: json.version,
                main: 'background.js',
                type: json.type,
                dependencies: json.dependencies || {}
            };
            fs.writeFileSync('dist/package.json', JSON.stringify(prodJson, null, 4));

            electronBuilder.build({
                config: {
                    directories: {
                        output: path.resolve(process.cwd(), 'release'),
                        app: path.resolve(process.cwd(), 'dist'),
                    },
                    asar: true,
                    appId: 'com.example.electron-vite-app',
                    productName: 'ElectronViteApp',
                    files: ['**/*'],
                    nsis: {
                        oneClick: false,
                        allowToChangeInstallationDirectory: true,
                    }
                }
            });
        }
    }
}