const Router = require('koa-router')
const router = new Router()
const {
	PositiveIntegerValidator
} = require('../../validators/validator')


router.get('/v1/:id/book', async (ctx, next) => {

	const v = await new PositiveIntegerValidator().validate(ctx)
	ctx.body = {
		key: '1'
	}
})


module.exports = router