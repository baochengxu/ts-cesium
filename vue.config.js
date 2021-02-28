/*
 * @Author: your name
 * @Date: 2021-02-02 23:22:03
 * @LastEditTime: 2021-02-12 14:58:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesium\vue.config.js
 */
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, cesiumWorkers),
                to: 'Workers'
            }, ]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'Assets'),
                to: 'Assets'
            }, ]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'Widgets'),
                to: 'Widgets'
            }, ]),
            // 解决：Unable to determine Cesium base URL automatically,…efining a global variable called CESIUM_BASE_URL.
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify('./'),
            }),
        ]
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'https://api.cesium.com', // 接口域名
    //             changeOrigin: true, //是否跨域
    //             pathRewrite: {
    //                 '^/api': '/v1/assets/2' // 因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的,所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
    //             }
    //         }
    //     }
    // }
}