import { AddressInfo } from 'net';
import type { Plugin } from 'vite';
import { spawn } from 'child_process';
import esbuild from 'esbuild';
import fs from 'fs';

import electron from 'electron';
const electronPath = electron as unknown as string;

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const dependencies = Object.keys(pkg.dependencies || {});

const buildBackground = () => {
    esbuild.buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        format: 'esm',
        alias: {
            'protobufjs/minimal': 'protobufjs/minimal.js',
        },
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
                let electronProcess = spawn(electronPath, ['dist/background.js', IP]);
                fs.watchFile('src/background.ts', () => {
                    electronProcess.kill();
                    buildBackground();
                    electronProcess = spawn(electronPath, ['dist/background.js', IP]);
                });
                electronProcess.stderr.on('data', (data) => {
                    console.log(`electron: ${data}`);
                });
            });
        }
    }
}