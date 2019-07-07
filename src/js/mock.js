var mock = require('./lib/mock.js');

window.SeMobAwardUtils = {};
window.SeMobAwardUtils.getRequest = function(url, data, cb){
    var name = cb.replace('window.SeMobAwardUtilsH5.', '');
    window.SeMobAwardUtilsH5[name](mock[name]);
    //return mock[name];
}

window.SeMobAwardUtils.getUserInfoJsonStr = function(){
    return mock.getUserInfoJsonStr;
}