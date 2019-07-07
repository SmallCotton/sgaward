var tools = require('./lib/tools');
var api = require('./lib/api');
var com = require('./lib/common');

com.doLogin();

var userInfo = api.getUserInfoJsonStr();
window.SeMobAwardUtilsH5 = {
    getMyCoupon: function(res){
        var res = tools.toJson(res);
        if(res.code==0){
            var m = res.data.money;
            var r = res.data.read;
            $('#couponBalance').html(m.couponBalance/100);
            $('#cashedAmount').html(m.cashedAmount/100);
            $('#withdrawLimit').html(m.withdrawLimit/100);
            $('#readnum').html(r.num);
        }else{
            tools.toast(data.msg);
        }
    }
}


var bindEvents = function(){
    $('#accountManage').on('click', function(e){
        api.gotoAccountManagerPage();
    });

};
var init = function(){
    //签到
    api.getRequest('/api/coupon/get_my_coupon', '', 'getMyCoupon');
    bindEvents();
};

init();