var express = require('express');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
var MongoStore = require('connect-mongo')(session);
//form提交表单，解析body的（必须）
var bodyParser = require('body-parser');

var path = require('path');
var hbs = require('express-hbs');

var waterline = require('./config/waterline');

console.log('express initialing...');
var app = express();

//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: null }}))

var db_of_acl = waterline.config.connections.localMongo;
var url =  'mongodb://'+db_of_acl.host+':'+ db_of_acl.port+'/'+db_of_acl.database;
app.use(session({
     secret: '12345',
     name: 'aclDemo',
     cookie: {maxAge: null },
     resave: false,
     saveUninitialized: true,
     store: new MongoStore({   //创建新的mongodb数据库
         host: db_of_acl.host,    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
         port: db_of_acl.port,          //数据库的端口号
         db: db_of_acl.database,        //数据库的名称。
         url:url
     })
 }));



// Use `.hbs` for extensions and find admin in `views/admin`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));



//form提交表单，解析body的（必须）
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', require('./routes/index'));

app.use('/api/acl_user', require('./app/routes/acl_user'));
app.use('/api/acl_role', require('./app/routes/acl_role'));
app.use('/api/acl_resource', require('./app/routes/acl_resource'));



// 错误请求处理
app.use(function(req, res, next){
  res.status(404);
  try {
    return res.json('Not Found');
  } catch(e) {
    console.error('404 set header after sent');
  }
});


app.use(function(err, req, res, next){
  if(!err) {return next()}
  res.status(500);
  try {
    return res.json(err.message || 'server error');
  } catch(e) {
    console.error('500 set header after sent');
  }
});

module.exports = app;
