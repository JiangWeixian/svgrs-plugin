# svgrs-plugin

[![npm](https://img.shields.io/npm/v/svgrs-plugin)](https://github.com/JiangWeixian/svgrs-plugin) [![GitHub](https://img.shields.io/npm/l/svgrs-plugin)](https://github.com/JiangWeixian/svgrs-plugin)

Use [svgr-rs](https://github.com/svg-rust/svgr-rs) with vite and webpack.

## install

```console
pnpm i svgrs-plugin
```

## usage

`vite`

```ts
import path from 'node:path'

import react from '@vitejs/plugin-react'
import { svgrs } from 'svgrs-plugin/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrs({
      exportType: 'named',
      namedExport: 'ReactComponent',
    })
  ],
})
```

`webpack`

```ts
{
  test: /\.svg$/i,
  issuer: /\.[jt]sx?$/,
  resourceQuery: /react/,
  use: [
    {
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2015',
      },
    },
    {
      loader: 'svgrs-plugin/webpack',
      options: {
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    },
  ],
}
```

## development

- **Setup** - `pnpm i`
- **Build** - `pnpm build`

# 
<div align='right'>

*built with ❤️ by 😼*

</div>

