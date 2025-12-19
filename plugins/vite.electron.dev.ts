import { AddressInfo } from 'net';
import type { Plugin } from 'vite';
import { spawn } from 'child_process';
import esbuild from 'esbuild';
import electron from 'electron';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const dependencies = Object.keys(pkg.dependencies || {});

const buildBackground = () => {
    esbuild.buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        format: 'esm',
        external: ['electron', ...dependencies],
    });
};
export const ElectronDevPlugin = (): Plugin => {
    return {
        name: 'vite:electron-dev',
        configureServer(server) {
            buildBackground();
            server.httpServer?.on('listening', () => {
                const address = server.httpServer?.address() as AddressInfo;
                const IP = "http://localhost:" + address.port;
                let electronProcess = spawn(electron as unknown as string, ['dist/background.js', IP]);
                fs.watchFile('src/background.ts', () => {
                    electronProcess.kill();
                    buildBackground();
                    electronProcess = spawn(electron as unknown as string, ['dist/background.js', IP]);
                });
                electronProcess.stderr.on('data', (data) => {
                    console.log(`electron: ${data}`);
                });
            });
        }
    }
}