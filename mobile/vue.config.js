module.exports = {
    publicPath: '/approveApp/',
    devServer: {
        open: true,
        hotOnly: false,
        proxy: {
            '/uat': {
                target: 'http://192.168.200.201/agw-web/fintech/common/gatewayService',
                changeOrigin: true,
                pathRewrite: {
                    '^/uat': ''
                }
            }
        },
    }
};