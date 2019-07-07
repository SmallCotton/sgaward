var tools = require('./lib/tools');
var api = require('./lib/api');
var com = require('./lib/common');
var $withdrawalsResult = document.getElementById('withdrawalsResult');
var $accountType = $('#accountType');
var $cashMoney = $('#cashMoney');

var cashOrderId = tools.kv('cashOrderId');

com.doLogin();

window.SeMobAwardUtilsH5 = {
    queryOrderStatus: function(res){
        var res = tools.toJson(res);
        if(res.code==0){
            $withdrawalsResult.className = 'wrapper withdrawalsResult suc';
            $accountType.html(res.data.accountType);
            $cashMoney.html(res.data.cashMoney/100);
        }else{
            $withdrawalsResult.className = 'wrapper withdrawalsResult err';
        }
    },
}
var bindEvents = function(){

}
var init = function(){
    api.getRequest('/api/withdraw/query_order_status', {cash_order_id: cashOrderId}, 'queryOrderStatus');
    com.dailyTask();
    bindEvents();
};

init();