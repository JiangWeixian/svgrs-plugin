import { transform } from '@svgr-rs/core'

import type { Config } from '@svgr-rs/core'
import type { Plugin } from 'vite'

export const svgrs = (options: Config): Plugin => {
  return {
    name: 'svgrs',
    async transform(code, id) {
      console.log(id)
      return code
      const jsCode = await transform(
        code,
        { icon: true },
        { componentName: 'MyComponent' },
      )
      return jsCode
    },
  }
}
