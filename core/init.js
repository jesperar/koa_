const requireDirectory = require('require-directory')
const Router = require('koa-router')


class InitManager {
	static initCore(app) {
		// 入口方法
		InitManager.app = app
		InitManager.initLoadRouters()
		InitManager.loadConfig()
	}

	static loadConfig(path = '') {
		const configPath = path || process.cwd() + '/config/config.js'
		const config = require(configPath)
		global.config = config
	}

	static initLoadRouters() {
		const apiDirectory = `${process.cwd()}/app/api`
		// 此插件可以做模块自动加载，不用 app.use 注册路由 ，参数1 模块， 参数2 路径 参数3 回调
		requireDirectory(module, apiDirectory, {
			visit: whenLoadModule
		})

		function whenLoadModule(obj) {
			if (obj instanceof Router) {
				InitManager.app.use(obj.routes())
			}
		}
	}
}

module.exports = InitManager