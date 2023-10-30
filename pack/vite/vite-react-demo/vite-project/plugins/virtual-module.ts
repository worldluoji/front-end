// plugins/virtual-module.ts
import { Plugin, ResolvedConfig } from 'vite';

/**
* 作为构建工具，一般需要处理两种形式的模块，一种存在于真实的磁盘文件系统中，另一种并不在磁盘而在内存当中，也就是虚拟模块。
* 通过虚拟模块，我们既可以把自己“手写的一些代码字符串”作为单独的模块内容，又可以将“内存中某些经过计算得出的变量”作为模块内容进行加载。
**/

// 虚拟模块名称
const virtualFibModuleId = 'virtual:fib';
// Vite 中约定对于虚拟模块，解析后的路径需要加上`\0`前缀
const resolvedFibVirtualModuleId = '\0' + virtualFibModuleId;

// 环境变量加载的虚拟模块
const virtualEnvModuleId = 'virtual:env';
const resolvedEnvVirtualModuleId = '\0' + virtualEnvModuleId;

export default function virtualFibModulePlugin(): Plugin {
  let config: ResolvedConfig | null = null;
  return {
    name: 'vite-plugin-virtual-module',
    configResolved(c: ResolvedConfig) {
        config = c
    },
    resolveId(id) {
      if (id === virtualFibModuleId) { 
        return resolvedFibVirtualModuleId;
      }
      if (id === virtualEnvModuleId) { 
        return resolvedEnvVirtualModuleId;
      }
    },
    load(id) {
      // 加载虚拟模块
      if (id === resolvedFibVirtualModuleId) {
        return 'export default function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }';
      }
      if (id === resolvedEnvVirtualModuleId) {
        // 感叹号后置为 非空断言操作符, 如果config为空，直接丢出断言失败
        return `export default ${JSON.stringify(config!.env)}`;
      }
    }
  }
}