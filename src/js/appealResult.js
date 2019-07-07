var tools = require('./lib/tools');
var api = require('./lib/api');
var com = require('./lib/common');
var $appealResult = $('.appealResult');
com.doLogin();

var userInfo = api.getUserInfoJsonStr();
if(userInfo.code==0){
    $('.nickname').html(userInfo.data.nickname)
}
 
var state = tools.kv('state');
if(state==2){
    $appealResult.addClass('err')
}else if(state==3){
    $appealResult.addClass('suc')
}