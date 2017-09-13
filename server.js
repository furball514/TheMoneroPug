const koa  = require('koa');
const router = require('koa-router');
const pug = require('koa-pug');
const body = require('koa-body');

const app = new koa();
const Router = new router();
const Pug = new pug({
	viewPath: './views',
    basedir: './views',
    app: app
});

Router.get('/',renderForm);
Router.get('/shortened',shortened);
Router.post('/',handleForm);

async function errorHandling (ctx,next) {
    try {
      await next;
  } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.createError('error', err, ctx);
  }
}

async function shortened (ctx) {
   ctx.render('shortened.pug',{
   	url: 'ctx.request.body',
   	shortenedLink: 'ctx.req.body'
   });
   console.log(ctx.request.body);
}

async function renderForm (ctx) {
     ctx.render('form.pug');
}

async function handleForm (ctx) {
	//console.log(ctx.req.body);
	console.log(ctx.request.body);
	//ctx.body = ctx.request.body;
	ctx.redirect('/shortened');
}

async function redirect (ctx) {
   if (404 != ctx.status) return;
   ctx.redirect('/');
}

//app.use(errorHandling);
app.use(body());
app.use(Router.routes());
app.use(redirect);
app.listen(process.env.PORT || 3000,() => {
	console.log(`listening 3000`);
});
