module.exports = {
    devServer: {
        // port:8000, //随便改端口号
        proxy: {
            '/d': {
                target: 'http://10.1.70.23:3000',
                // host: 'mapi.vip.com',
                changeOrigin: true
            }
        }
    }
}
