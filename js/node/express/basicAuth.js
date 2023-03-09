const express = require('express');
const app = express();

const realms = [
  { realm: 'protected_docs', path: '/protected_docs', users: ['test'] }
];

const users = [
  { usrname: 'test', passwd: '123456' }
];

// 检查资源路径对应的realm，比如 path:'/protected_docs' => realm:'protected_docs'
function findRealm (path) {
  return realms.find(item => path.indexOf(item.path) !== -1);
}

// 根据用户名、密码进行校验
function checkUser (usrname, passwd) {
  return users.find(user => user.usrname === usrname && user.passwd === passwd);
}

// 判断用户是否在realm里
function isUserInRealm (realmItem, usrname) {
  return realmItem.users.indexOf(usrname) !== -1;
}

function notAuthorized (res) {  
  res.status = 403;
  res.end();
}

const protectedPath = '/protected_docs';

app.get(protectedPath, (req, res, next) => {

  const realmItem = findRealm(protectedPath);
  const realm = realmItem.realm; // 这里是 protected_docs
  const authorization = req.get('authorization');

  // 请求如果没有带authorization， 告知用户需要身份认证
  if (!authorization) {
    res.statusCode = 401;
    res.set('WWW-Authenticate', 'Basic realm=' + encodeURIComponent(realm));
    res.end();
    return;
  }

  // authorization格式错误，告知认证不通过
  const basic = authorization.split(' ');
  if (basic.length < 2) {
    return notAuthorized(res);
  }
  const usernamePasswd = basic[1]; // Basic Y2h5aW5ncDoxMjM0NTY
  const [usrname, passwd] = Buffer.from(usernamePasswd, 'base64').toString().split(':');

  // 用户是否在realm里
  if (isUserInRealm(realmItem, usrname) === false) {
    return notAuthorized(res);
  }

  // 验证账户和密码
  if (!checkUser(usrname, passwd)) {
    return notAuthorized(res);
  }

  res.end(`welecom ${usrname}`);
});

app.listen(3008);
console.log('http://localhost:3008/protected_docs');