const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

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
                    loader: 'ts-loader', // ts-loader会调用tsc编译器，与工程公用一个tsconfig.json
                    options: {
                        // ts-loader还有很多配置项，可参考官方文档
                        transpileOnly: true // 默认是false, 如果为true,只做代码转换，不做类型检查，编译速度会变快
                        // 如果既想速度变快，又做类型检查，就可以把该选项置为true,再使用插件：npm i fork-ts-checker-webpack-plugin -D
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
}
