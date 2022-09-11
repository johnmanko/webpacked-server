import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    
    target: 'node',
    entry: {
        index: './src/index.ts'
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
                test: /\.html$/i,
                loader: "html-loader",
            },
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