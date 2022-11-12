import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [
    alias({
      entries: [
        // 将把 import xxx from 'module-a' 
        // 转换为 import xxx from './module-a'
        { find: 'module-a', replacement: './module-a.js' },
      ]
    }),
    // 将会把代码中所有的 __TEST__ 替换为 1
    replace({
        __TEST__: 1
    })
  ]
};