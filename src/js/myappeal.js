var tools = require('./lib/tools');
var api = require('./lib/api');
var tpl = require('./tpl/myappeal');
var com = require('./lib/common');
var $recordList = $('#recordList');

com.doLogin();

window.SeMobAwardUtilsH5 = {
    getAppealList: function(res){
        var res = tools.toJson(res);
        console.log(res);
        if(res.code==0){
            res.data.dateFormat = tools.dateFormat;
            console.log(tpl.appealList(res.data))
            $recordList.html(tpl.appealList(res.data));
        }else{
            tools.toast(data.msg);
        }
    }
}

var bindEvents = function(){

}

var init = function(){
    
    api.getRequest('/api/appeal/get_appeal_list', '', 'getAppealList');

    bindEvents();
};

init();

