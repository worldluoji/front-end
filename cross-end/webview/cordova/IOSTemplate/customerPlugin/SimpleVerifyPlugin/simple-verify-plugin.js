var exec = require('cordova/exec');
 
var SimpleVerifyPlugin = {
 
  verifyPassword: function(sendMsg, onSuccess, onFail) {
    return exec(onSuccess, onFail, 'SimpleVerifyPlugin', 'verifyPassword', [sendMsg]);
  }
 
};
 
module.exports = SimpleVerifyPlugin;