# Rspack
Rspack (pronounced as /'ɑrespæk/, ) is a high performance Rust-based JavaScript bundler that offers strong interoperability with the webpack ecosystem, 
enabling faster development cycles and efficient collaboration between the two tools.

Rspack is compatible with webpack's configuration schema and loader architecture. 
You can seamlessly use familiar loaders such as babel-loader, less-loader, sass-loader, vue-loader, etc.

Although Rspack already meets the needs of many projects, there is still a big gap to reach the full capabilities of webpack. 
Prioritization will be based on community feedback.

<br>

## Compare with other pack tools
### Compared with Vite
Vite offers a great developer experience, but its reliance on Rollup for production builds faces similar performance costs as other JavaScript-based algorithms. 
The same tradeoffs of webpack versus Rollup also apply, for example flexibility of the optimization.splitChunks feature.

### Compared with esbuild#
esbuild achieves very good performance by implementing nearly all operations in Golang except for some JavaScript plugins. 
However, esbuild's feature set is not as complete as webpack, for example with respect to JavaScript Hot Module Replacement (HMR) and incremental compilation, 
and also the optimization.splitChunks feature.

### Compared with Turbopack#
Turbopack is implemented in Rust like Rspack, but Turbopack started over with a redesigned architecture and configuration. 
This brings some benefits, but presents a steeper migration cost for projects that rely on webpack and its extensive ecosystem.

<br>

## reference
https://www.rspack.dev/guide/introduction.html