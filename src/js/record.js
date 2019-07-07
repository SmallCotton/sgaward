var tools = require('./lib/tools');
var api = require('./lib/api');
var tpl = require('./tpl/record');
var com = require('./lib/common');
var $recordList = $('#recordList');

com.doLogin();

window.SeMobAwardUtilsH5 = {
    queryCouponRecord: function(res){
        var res = tools.toJson(res);
        if(res.code==0){
            res.data.dateFormat = tools.dateFormat;
            console.log(tpl.recordList(res.data), 'queryCouponRecord');

            $recordList.html(tpl.recordList(res.data));
        }else{
            tools.toast(data.msg);
        }
    }
}

var bindEvents = function(){

}

var init = function(){
    //签到
    api.getRequest('/api/coupon/query_coupon_record', '', 'queryCouponRecord');

    bindEvents();
};

init();