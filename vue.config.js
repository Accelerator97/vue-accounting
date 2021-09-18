const path = require('path')

module.exports = {
    chainWebpack: config =>{
        const dir = path.resolve(__dirname,'src/assets/icons')
        config.module //config是vue对webpack进行封装暴露给用户使用
            .rule('svg-sprite')//添加规则
            .test(/\.svg$/)//文件匹配则使用规则,以svg结尾
            .include.add(dir).end() //只针对icons目录
            .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract:false}).end()//extract:false是指不要解析成文件
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])//配置插件
        config.module.rule('svg').exclude.add(dir)//其他svg loader排除icon目录
    }
}