var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/index.js', // 指定入口文件
    output: {
        path: path.join(__dirname, 'build/'), // 打包输出的路径
        filename: 'bundle.js', // 输出名称
        publicPath: '/static/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel']}
        ]

    },
    resolve: {
        // 配置后相关文件名的扩展名可以忽略
        extensions: ['', '.js', '.jsx', '.json', '.coffee']
    },
    plugins: [
        // Webpack压缩代码的时候，React官方提供的代码已经是合并的, 可以通过以下插件优化
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};
// path: 用于处理目录的对象
// __dirname：获取当前模块文件所在目录的完整绝对路径
// 这里的path.join(__dirname, 'build/')相当于：volumes/qzhou/mac/www/webpack/build
