var tools = require('./lib/tools');
var api = require('./lib/api');
var tpl = require('./tpl/withdrawals');
var com = require('./lib/common');
var $amountLimits = $('#amountLimits');
var $remainNum = $('.remainNum');
var $totalNum = $('.totalNum');
var $loginDayLimit = $('.loginDayLimit');
var $amountLimit = $('.amountLimit');
var $alertBox = document.getElementById('alertBox');
var $nickname = $('#nickname');
var $avatarUrl = $('#avatarUrl');

com.doLogin();
 
com.getUserInfo(function(res){
    console.log(res, 'aaaa')
    if(res.code==0){
        $nickname.html(res.data.nickname);
        $avatarUrl.attr('src', res.data.avatar_url);
    }
});

var setBits = function(a, b, c, d){
    $remainNum.html((a*100/b).toFixed(2)+'%');
    $totalNum.html(b);
    $loginDayLimit.html(c);
    $amountLimit.html(d/100);
}

var as = function(c, msg){
    document.documentElement.className = 'alertshow';
    $alertBox.className = "alert-box "+c;
    if(c=='msg'){
        $('#msg').html(msg);
    }
}
var ah = function(){
    document.documentElement.className = '';
    $alertBox.className = "alert-box ";
}

window.SeMobAwardUtilsH5 = {
    getMyCoupon: function(res){
        var res = tools.toJson(res);
        console.log(res, 'getMyCoupon');

        if(res.code==0){
            var m = res.data.money;
            $('#couponBalance').html(m.couponBalance/100);
        }else{
            tools.toast(data.msg);
        }
    },
    queryWithdrawConfig: function(res){
        var res = tools.toJson(res);
        console.log(res, 'queryWithdrawConfig');

        if(res.code==0){
            $amountLimits.html(tpl.amountLimits(res.data));
            var f = res.data && res.data.configList && res.data.configList[0];
            setBits(f.remainNum, f.totalNum, f.loginDayLimit, f.amountLimit);
        }else{
            tools.toast(data.msg);
        }
    },
    submitWithdraw: function(res){
        var res = tools.toJson(res);
        switch(res.code){
            case 0:
                $('#cashOrderId').attr('href', 'withdrawalsResult.html?cashOrderId='+ res.data.cashOrderId);    
                as('suc');
                break;
            case 1006:
                as('zfb');
                break;
            case 1005:
                as('wx');
                break;
            case 1001:
                as('ym');
                break;
            case 1004:
                as('qd');
                break;
            case 1007:
                as('sfz');
                break;
            case 1003:
                as('lq');
                break;
            case 405:
                as('sjh');
                break;
            default:
                com.msgshow('msgbox1', {msg: res.msg});
        }
    }
}

var bindEvents = function(){

    $('#withdrawType').on('click', 'a', function(e){
        var $this = $(this);
        $this.addClass('sel').siblings().removeClass('sel');
    });

    $amountLimits.on('click', 'a', function(e){
        var $this = $(this);
        $this.addClass('sel').siblings().removeClass('sel');
        var remainNum = $this.attr('data-remainNum');
        var totalNum = $this.attr('data-totalNum');
        var loginDayLimit = $this.attr('data-loginDayLimit');
        var amountLimit = $this.attr('data-amountLimit');
        setBits(remainNum, totalNum, loginDayLimit, amountLimit);
    });
    
    $('#zfbbd').on('click', function(){
        api.bindAlipay();
        ah();
    });
    $('#wxbd').on('click', function(){
        api.bindWechat();
        ah();
    });
    $('#sjhbd').on('click', function(){
        api.bindPhone();
        ah();
    });

    $('#submit').on('click', function(){
        if(com.checkNetwork()==true && com.checkLimitsBlack(true)==true && com.checkLimitsAppeal(true)==true){
            var type = $('#withdrawType').find('.sel').attr('data-type');
            var money = $amountLimits.find('.sel').attr('data-amountLimit');
            var queryData = {
                withdraw_account_type: type || '',
                withdraw_money: money || 0
            };
            api.getRequest('/api/withdraw/submit_withdraw', queryData, 'submitWithdraw');
        }
    });
    
    $('._close').on('click', function(e){
        document.documentElement.className = '';
        $alertBox.className = "alert-box ";
    });
    
};

var init = function(){
    api.getRequest('/api/coupon/get_my_coupon', '', 'getMyCoupon');
    api.getRequest('/api/withdraw/query_withdraw_config', '', 'queryWithdrawConfig');
    
    com.getUserLimits();

    bindEvents();
};

init();