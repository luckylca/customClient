# customClient

This template should help get you started developing with Vue 3 in Vite.

## Cross-Platform Dev (macOS / Windows / Linux)

To keep development startup identical across platforms, use the same two commands:

```sh
npm install
npm run dev
```

Requirements:

- Node.js 20+ (recommended: Node 22 LTS)
- npm 10+
- Electron runtime dependencies available on your OS

The dev plugin launches Electron through Node resolution (`require('electron')`) and uses the same startup flow on all three platforms, so no platform-specific code changes are required for normal dev startup.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
