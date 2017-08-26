const Koa = require('koa')
const app = new Koa()
let api = require('koa-router')()
let users = require('./routes/users.js')
let tenants = require('./routes/tenants.js')
let auth = require('./routes/auth.js')
let docs = require('./routes/docs.js')
let props = require('./routes/props.js')
let messages = require('./routes/messages.js')
let config = require('../webpack.config.js')


// middleware
let koaWebpack = require('koa-webpack')
const middleware = koaWebpack({
  config: config
})
app.use(middleware({
  config: config
}))

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
api.use('/api/users', users.routes())
api.use('/api/tenants', tenants.routes())
api.use('/api/docs', docs.routes())
api.use('/api/props', props.routes())
api.use('/api/messages', messages.routes())
api.use('/api/auth', auth.routes())



// use router
app
	.use(api.routes())
	.use(api.allowedMethods())

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log('Listening on port: ', port)
})

