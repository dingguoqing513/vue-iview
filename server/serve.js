var express = require('express');
var app = express();
var mysql  = require('mysql')
var moment = require('moment')
var chalk = require('chalk')
var session = require('express-session')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false }) // 创建 application/x-www-form-urlencoded 解析器

app.use(session({
   secret: 'secret',
   resave: true,
   cookie: { maxAge: 1000 * 60 * 60 * 24 },
   saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var connection = mysql.createConnection({    
  host     : 'localhost',      
  user     : 'root',             
  password : '1258012581',      
  port: '3306',                  
  database: 'learning'
});
  
connection.connect();
 
app.all('*', function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.header('Access-Control-Allow-Methods', '*');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Content-Type', 'application/json;charset=utf-8');
   next();
})

app.get('/login', function (req, res) {
    var response = {
       "account": req.query.account,
       "password": req.query.password,
   };
   var selectSQL = "select account, password from user where account = '" + req.query.account + "' and password = '" + req.query.password + "'";
   var addSqlParams = [req.query.account, req.query.password];
   connection.query(selectSQL, function (err, result) {
      if (err) {
         console.log('[login ERROR] - ',err.message);
         return;
      }
      if (result == '') {
         console.log("登录失败");
         res.json({ code: -1, msg: '用户名或密码错误' })
      } else {
         console.log("登录成功");
         res.json({ code: 1, msg: '登录成功' })
      }
      
   });
   console.log(response);
})
 
//注册模块
app.get('/register', function (req, res) {
   // var addSql = 'INSERT INTO user(account, password, name) VALUES(?,?,?)'; // 意思同下
   var addSql = "insert into user(account, password, name) values('" + req.query.account + "','" + req.query.password + "','" + req.query.name + "')";
   var selSql = "select account from user where account='" + req.query.account + "'" // 查询数据库是否有当前账户
   var response = {
      "account": req.query.account,
      "password": req.query.password,
      "name": req.query.name
   };
   var addSqlParams = [req.query.account, req.query.password, req.query.name];
   connection.query(selSql, (err, result) => {
      if (!req.query.account) {
         res.json({ code: -4001, msg: '缺少用户名' })
         console.log('注册失败，缺少用户名')
         return
      }
      if (!req.query.password) {
         res.json({ code: -4002, msg: '缺少密码' })
         console.log('注册失败，缺少密码')
         return
      }
      if (!req.query.name) {
         res.json({ code: -4003, msg: '缺少姓名' })
         console.log('注册失败，缺少姓名')
         // res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
         // res.end('缺少姓名') // 或者writeHead和end组合使用
         return
      }
      var toRegister = () => {
         connection.query(addSql, (err, result) => {
            if (err) {
               console.log(err)
               return
            }
            res.json({ code: 201, msg: '注册成功' })
            console.log(req.query.account + '注册成功')
         })
      }
      if (err) {
         console.log('注册失败，' + err)
         return
      }
      if (result == '') {
         toRegister()
      } else {
         res.json({ code: -1001, msg: '注册失败，用户名已经存在' })
         console.log(req.query.account + '用户名已经存在')
      }
   })
   console.log(response);
})

// 查询用户信息
app.get('/userInfo', function (req, res) {
   var selInfoSql = `select * from user where account = '${req.query.account}'`
   connection.query(selInfoSql, (err, result) => {
      if (err) {
         console.log('[SELECT ERROR] - ',err.message);
         return;
      }
      if (result == '') {
         console.log("获取失败");
         res.json({ code: -4004, msg: '获取用户信息失败' })
      } else {
         req.session['account'] = result[0].account;
         console.log(req.session['account'])
         console.log("获取用户信息成功");
         console.log(result[0].account);
         res.json({ code: 200, msg: '获取用户信息成功', data:
            {
               name: result[0].name,
               account: result[0].account
            }
         })
      }
   })
})

app.post('/addUser', urlencodedParser, function (req, res) {
   let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
   let fromId = req.session['account']
   var selAddSql = `insert into underEmployee(id, name, department, phone, email, education, fromId, createTime) values('${req.body.id}','${req.body.name}','${req.body.department}',${req.body.phone},'${req.body.email}','${req.body.education}','${fromId}','${createTime}')`
   console.log(selAddSql)
   connection.query(selAddSql, (err, result) => {
      if (err) {
         console.log('[ADD ERROR] - ', err.message);
         return res.json({ code: -4005, msg: '新增用户失败' });
      }
      if (result == '') {
         console.log('新增用户失败')
         res.json({ code: -4010, msg: '新增用户失败' })
      } else {
         console.log('新增用户成功')
         res.json({ code: 200, msg: '新增用户成功', data: result })
      }
   })
})

app.get('/userList', function (req, res) {
   var selListSql = `select * from underEmployee where fromId='${req.session['account']}' order by createTime desc limit ${--req.query.page * 10 || 0}, ${req.query.page_size || 10}`;
   console.log(selListSql)
   var selAllListSql = `select * from underEmployee where fromId='${req.session['account']}'`
   var total = 0;
   connection.query(selAllListSql, (err, result) => {
      if (err) {
         console.log('[ADD ERROR] - ', err.message);
         return;
      }
      if (result != '') {
         total = result.length
      }
   })
   connection.query(selListSql, (err, result) => {
      if (err) {
         console.log('[ADD ERROR] - ', err.message);
         return;
      }
      if (result == '') {
         console.log('列表为空')
         res.json({ code: 200, msg: '列表为空' })
      } else {
         console.log('查询列表成功')
         res.json({ code: 200, msg: '查询列表成功', list: result, total: total })
      }
   })
})

app.patch('/updateList', function (req, res) {
   let updateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
   var updateListSql = `update underEmployee set name='${req.body.name}', department='${req.body.department}', phone=${req.body.phone}, email='${req.body.email}', education='${req.body.education}', updateTime='${updateTime}' where id=${req.body.id}`;
   connection.query(updateListSql, (err, result) => {
      if (err) {
         console.log('[MODIFY ERROR] - ', err.message);
         return res.json({ code: -4006, msg: '修改用户失败' });
      }
      if (result == '') {
         console.log('修改用户失败')
         res.json({ code: -4007, msg: '修改用户失败' })
      } else {
         console.log('修改用户成功')
         res.json({ code: 200, msg: '修改用户成功' })
      }
   })
})

app.post('/searchList', function (req, res) {
   var searchListSql = `select * from underEmployee where name like '%${req.body.keyword}%' limit ${--req.body.page * 10 || 0}, ${req.body.page_size || 10}`;
   var searchListTotalSql = `select * from underEmployee where name like '%${req.body.keyword}%'`;
   var searchTotal = 0;
   connection.query(searchListTotalSql, (err, result) => {
      if (err) {
         return
      }
      if (result != '') {
         searchTotal = result.length
      }
   })

   connection.query(searchListSql, (err, result) => {
      if (err) {
         console.log('[SEARCH ERROR] - ', err.message);
         return
      }
      if (result == '') {
         res.json({ code: 200, msg: '搜索记录为空' })
      } else {
         console.log(result)
         res.json({ code: 200, msg: `搜索出${searchTotal}条记录`, list: result, total: searchTotal })
      }
   })
})

app.delete('/delList', function (req, res) {
   var delListSql = `delete from underEmployee where id = ${req.body.id}`;
   connection.query(delListSql, (err, result) => {
      if (err) {
         console.log('删除列表失败', err.message);
         return;
      }
      if (result == '') {
         res.json({ code: 200, msg: '删除列表' })
      } else {
         console.log('删除列表成功');
         res.json({ code: 200, msg: '删除列表成功', data: result })
      }
   })
})
 
var server = app.listen(3000, function () {
  var port = server.address().port
  console.log(chalk.red.bold.italic.inverse("应用实例，访问地址为 http://localhost:", port))
  
})