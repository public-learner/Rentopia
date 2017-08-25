const Koa = require('koa')
const app = new Koa()
let router = require('koa-router')()


// middleware

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

// routing




// use router
app
	.use(router.routes())
	.use(router.allowedMethods())

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log('Listening on port: ', port)
})

