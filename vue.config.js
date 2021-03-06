// vue.config.js
const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/site/vue-demo/" : "/", // 公共路径
    indexPath: "index.html", // 相对于打包路径index.html的路径
    outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
    assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // 向 PWA 插件传递选项。
    configureWebpack: config => {
        // webpack配置，值位对象时会合并配置，为方法时会改写配置
        // 开启 gzip 压缩
        // 需要 npm i -D compression-webpack-plugin
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    chainWebpack: config => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        config.resolve.alias // 添加别名
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"))
            .set("@views", resolve("src/views"))
            .set("@store", resolve("src/store"));
    },
    css: {
        extract: IS_PROD,
        requireModuleExtension: true, // 去掉文件名中的 .module
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            sass: {
                prependData: `@import  "./src/assets/styles/main.scss";`
            }
        }
    },
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        host: '0.0.0.0', //默认localhost，0.0.0.0代表可以被外界访问
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        hot: true, //开启热加载
        hotOnly: false, // 热更新
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
        proxy: {
            // 开发环境代理配置
            "/devapi": {
                // 意思是当请求是以 /dev-api 开头的请求，都走代理
                // 目标服务器地址，代理访问：http://localhost:8001
                target: "http://www.web-jshtml.cn/productapi",
                changeOrigin: true, // 开启代理服务器，就会给你代理转发
                pathRewrite: {
                    // /dev-api/db.json 最终会转发到 http://localhost:8001/db.json
                    "^/devapi": "" // 就是将请求地址中的 //dev-api 前缀替换成空的
                }
            }
        }
    }
};