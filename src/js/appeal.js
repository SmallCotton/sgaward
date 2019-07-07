var tools = require('./lib/tools');
var api = require('./lib/api');
var tpl = require('./tpl/record');
var com = require('./lib/common');
var $name = $('#name');
var $id = $('#id');
var $phone = $('#phone');
var $desc = $('#desc');

var $msg = $('#msg');
var $submit = $('#submit');

com.doLogin();


var queryData = {
    // appeal_desc: '',
    user_id_card: '',
    user_mobile: '',
    user_real_name: ''
}

var btnstatus = function(){
    var lock = true;
    for(var key in queryData){
        if(!queryData[key]){
            lock = false;
            break;
        }
    }
    // console.log(lock, 'aaa')
    if(lock){
        $submit.removeClass('disabled');
    }
}

var as = function(msg){
    document.documentElement.className = 'alertshow';
    $msg.html(msg);
}

window.SeMobAwardUtilsH5 = {
    submitAppeal: function(res){
        var res = tools.toJson(res);
        console.log(res,'res')
        if(res.code==0){
            location.href = '/myappeal.html';
        }else{
            as(res.msg);
        }
    }
}

var bindEvents = function(){

    $submit.on('click', function(){
        if(!$submit.hasClass('disabled')){
            api.getRequest('/api/appeal/submit_appeal', queryData, 'submitAppeal');
        }
    });

    $name.on('blur', function(e){
        var val = $(this).val();
        if(tools.checkName(val)){
            queryData.user_real_name = val;
        }else{
            if(val){
                as('姓名格式有误');
            }else{
                as('姓名不能为空');
            }
        };
        btnstatus();
    });

    $phone.on('blur', function(e){
        var val = $(this).val();
        if(tools.checkPhone(val)){
            queryData.user_mobile = val;
        }else{
            if(val){
                as('手机号格式有误');
            }else{
                as('手机号不能为空');
            }
        };
        btnstatus();
    });

    $id.on('blur', function(e){
        var val = $(this).val();
        if(tools.checkIdcard(val)){
            queryData.user_id_card = val;
        }else{
            if(val){
                as('身份证号码格式有误');
            }else{
                as('身份证号不能为空');
            }
        };
        btnstatus();
    });
    
    $desc.on('blur', function(e){
        var val = $(this).val();
        queryData.appeal_desc = val;
    });

    $('.close').on('click', function(e){
        document.documentElement.className = '';
    });

}

var init = function(){

    bindEvents();
};

init();