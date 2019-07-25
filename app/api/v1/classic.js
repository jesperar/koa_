const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic', (ctx, next) => {
	ctx.body = {
		key: '2'
	}
})

module.exports = router