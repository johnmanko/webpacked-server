const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'image-worker',
    target: 'node',
    entry: {
        worker: './src/lib/util/thread-workers/worker.ts'
    },
    devtool: 'inline-source-map',
    node: {
        global: true,
        __filename: true,
        __dirname: true,
    },
    module: {
        parser: {
          javascript: {
            importMeta: false,
          },
        },
        rules: [
            {
                test: /\.[jt]sx?$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.node$/, use: "node-loader" }
        ],
    },
    experiments: {
        topLevelAwait: true,
        outputModule: true // false for commmonjs
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.mjs',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: '[name].[contenthash].bundle.map',
        chunkFormat: 'module',
        chunkFilename: '[name].[contenthash].mjs'
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /canvas/,
            contextRegExp: /jsdom$/
        }),
        new webpack.ContextReplacementPlugin(/require_optional/)
    ],
    externals: {
        'piscina': 'module piscina'
    }
};