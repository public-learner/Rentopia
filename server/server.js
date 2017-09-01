const Koa = require('koa')
const app = new Koa()
let api = require('koa-router')()
let users = require('./routes/users.js')
let tenants = require('./routes/tenants.js')
let landlords = require('./routes/landlords.js')
let auth = require('./routes/auth.js')
let docs = require('./routes/docs.js')
let props = require('./routes/props.js')
let messages = require('./routes/messages.js')
let payments = require('./routes/payments.js')
let config = require('../webpack.config.js')
let db = require('../db/db_config.js')
const bodyParser = require('koa-bodyparser');
let send = require('koa-send');
const path = require('path')
let serve = require('koa-static')
let session = require('koa-session')

// db connection
// db now available from ctx throughout app
app.context.db = db

// middleware
let koaWebpack = require('koa-webpack')
const middleware = koaWebpack({
  config: config
})
app.use(middleware)
app.use(serve(__dirname + 'dist'));

// bodyparser
// the parsed body will store in ctx.request.body
// if nothing was parsed, body will be an empty object {}
app.use(bodyParser())

app.keys = ['ironmen']
app.use(session(app))

api.use('/api/auth', auth.routes.routes())

app.use(function* (next) {
  this.session.test = 'test'
  this.session.isLoggedIn = this.session.isLoggedIn || false
  console.log('server.js', this.session)
  if (!this.session.isLoggedIn) {
    console.log('redirecting')
    this.redirect('/')
  }  
   
  yield next
});

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
api.use('/api/users', users.routes.routes())
api.use('/api/tenants', tenants.routes.routes())
api.use('/api/docs', docs.routes.routes())
api.use('/api/props', props.routes.routes())
api.use('/api/messages', messages.routes.routes())
api.use('/api/payments', payments.routes.routes())
api.use('/api/landlords', landlords.routes.routes())

// app.use(async (ctx, next) => {
// 	//ctx.body = await ctx.db.query(`SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public'; `)
// })

// use router
app
	.use(api.routes())
	.use(api.allowedMethods())

const port = process.env.PORT || 8000

app.use(async (ctx) => { 
  await send(ctx, '/index.html', { root: 'dist' }) 
})

app.listen(port, () => {
	console.log('Listening on port: ', port)
})

