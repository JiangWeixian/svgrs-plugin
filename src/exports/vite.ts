import fs from 'node:fs/promises'

import { createFilter } from '@rollup/pluginutils'
import { transform } from '@svgr-rs/core'
import { transformWithEsbuild } from 'vite'

import { patchNamed } from '../patch'

import type { Config } from '@svgr-rs/core'
import type { Plugin } from 'vite'

interface SvgrsOptions extends Config {
  include?: string[]
  exclude?: string[]
}

const postfixRE = /[?#].*$/s
function cleanUrl(url: string): string {
  return url.replace(postfixRE, '')
}

export const svgrs = ({
  namedExport = 'ReactComponent',
  exportType = 'named',
  jsxRuntime = 'automatic',
  icon = true,
  include = ['**/*.svg'],
  exclude = [],
  ...config
}: SvgrsOptions = {}): Plugin => {
  const filter = createFilter(include, exclude)
  return {
    name: 'vite-plugin-svgrs',
    async transform(code, id) {
      if (filter(cleanUrl(id))) {
        const raw = await fs.readFile(cleanUrl(id), 'utf-8')
        let svgrsCode = await transform(
          raw,
          { namedExport, exportType, jsxRuntime, icon, ...config },
          {
            componentName: namedExport,
            filePath: id,
            caller: {
              previousExport: code,
              name: 'svgrs-plugin/vite',
            },
          },
        )
        // Config looks like not support yet..
        if (exportType === 'named') {
          svgrsCode = patchNamed(svgrsCode, code, { componentName: namedExport })
        }
        const result = await transformWithEsbuild(svgrsCode, id, {
          loader: 'jsx',
        })
        return {
          code: result.code,
          map: result.map,
        }
      }
      return code
    },
  }
}
