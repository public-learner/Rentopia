const Koa = require('koa')
const app = new Koa()
let api = require('koa-router')()
let users = require('./routes/users')
let tenants = require('./routes/tenants')
let auth = require('./routes/auth')
let docs = require('./routes/docs')
let props = require('./routes/props')
let messages = require('./routes/messages')



// middleware

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// });

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}`);
// });


// routing
api.use('/users', users.routes())
api.use('/tenants', tenants.routes())
api.use('/docs', docs.routes())
api.use('/props', props.routes())
api.use('/messages', messages.routes())
api.use('/auth', auth.routes())



// use router
app
	.use(api.routes())
	.use(api.allowedMethods())

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log('Listening on port: ', port)
})

