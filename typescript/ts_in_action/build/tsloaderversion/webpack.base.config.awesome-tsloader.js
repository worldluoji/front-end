/**
* 改为使用 awesome-typescript-loader, 
* 其更适合与babel集成，使用babel的转移和缓存，内置Checker类型检查插件等
* 但其类型检查有遗漏，因此还是建议使用ts-loader默认配置即可。
* npm install awesome-typescript-loader --save-dev
* https://www.npmjs.com/package/awesome-typescript-loader
*/

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    entry: {
        'app': './src/index.ts'
    },
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        // ts-loader还有很多配置项，可参考官方文档
                        transpileOnly: true // 默认是false, 如果为true,只做代码转换，不做类型检查，编译速度会变快
                        // 如果既想速度变快，又做类型检查，就可以使用awesome-typescript-loader的内置Checker
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html'
        }),
        new CheckerPlugin()
    ]
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
}

