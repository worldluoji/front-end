import { build as viteBuild } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { join } from 'path';
import type { RollupOutput } from 'rollup';
import pluginReact from '@vitejs/plugin-react';
import fse from 'fs-extra';

// 打包
export async function bundle(root: string) {
  const clientBuild = async () => {
    return viteBuild({
      mode: 'production',
      root,
      build: {
        outDir: 'build',
        rollupOptions: {
          input: CLIENT_ENTRY_PATH,
          output: {
            format: 'esm'
          }
        }
      },
      plugins: [pluginReact()]
    });
  };

  const serverBuild = async () => {
    return viteBuild({
      mode: 'production',
      root,
      build: {
        ssr: true,
        outDir: '.temp',
        rollupOptions: {
          input: SERVER_ENTRY_PATH,
          output: {
            format: 'cjs'
          }
        }
      },
      plugins: [pluginReact()]
    });
  };

  console.log('Building client + server bundles...');
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      clientBuild(),
      serverBuild()
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}

/*
build 方法，主要分三步:
打包代码，包括 client 端 + server 端
引入 server-entry 模块
服务端渲染，产出
*/
export async function build(root: string = process.cwd()) {
  const [clientBundle, serverBundle] = await bundle(root);
  // 引入 ssr 入口模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  const { render } = await import(serverEntryPath);
  await renderPage(render, root, clientBundle);
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  console.log('Rendering page in server side...', clientChunk?.fileName);
  const appHtml = render();
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/${clientChunk?.fileName}"></script>
      </body>
    </html>`.trim();
  await fse.ensureDir(join(root, 'build'));
  await fse.writeFile(join(root, 'build/index.html'), html);
  await fse.remove(join(root, '.temp'));
}
