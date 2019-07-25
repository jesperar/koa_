const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')

const app = new Koa()

app.use(parser())
// 路由模块注册
InitManager.initCore(app)

app.listen('3000', ()=>{
	console.log('success!')
})