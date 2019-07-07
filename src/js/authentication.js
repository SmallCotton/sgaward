var tools = require('./lib/tools');
var api = require('./lib/api');
var tpl = require('./tpl/record');
var com = require('./lib/common');
var $picBox = $('#picBox');
var $name = $('#name');
var $id = $('#id');
var $msg = $('#msg');
var $submit = $('#submit');

var queryData = {
    image_base64: '',
    real_id: '',
    real_name: ''
}

var btnstatus = function(){
    var lock = true;
    for(var key in queryData){
        if(!queryData[key]){
            lock = false;
            break;
        }
    }
    if(lock){
        $submit.removeClass('disabled');
    }
}

var as = function(msg){
    document.documentElement.className = 'alertshow';
    $msg.html(msg);
}

window.SeMobAwardUtilsH5 = {
    takePhoto: function(res){
        $('#picBox').html('<img src="'+decodeURIComponent(res)+'">');
        queryData.image_base64 = res;
        btnstatus();
    },
    submitVerified: function(res){
        var res = tools.toJson(res);
        console.log(res, 'submitVerified');
        if(res.code==0){
            location.href = '/withdrawals.html';
        }else{
            document.documentElement.className = 'err';
        }
    }
}

var bindEvents = function(){

    $picBox.on('click', function(){
        api.takePhoto('takePhoto');
    });

    $submit.on('click', function(){
        if(!$submit.hasClass('disabled')){
            document.documentElement.className = 'doing';
            api.submitVerified('/api/bind/submit_verified', {
                real_id: queryData.real_id,
                real_name: queryData.real_name
            }, queryData.image_base64,'submitVerified');
        }
    });

    $name.on('blur', function(e){
        var val = $(this).val();
        if(tools.checkName(val)){
            queryData.real_name = val;
        }else{
            if(val){
                as('姓名格式有误');
            }else{
                as('姓名不能为空');
            }
        };
        btnstatus();
    });
    
    $id.on('blur', function(e){
        var val = $(this).val();
        if(tools.checkIdcard(val)){
            queryData.real_id = val;
        }else{
            if(val){
                as('身份证号码格式有误');
            }else{
                as('身份证号不能为空');
            }
        };
        btnstatus();
    });
    
    $('.close').on('click', function(e){
        document.documentElement.className = '';
    });

    $('#refresh').on('click', function(){
        $('input').val('');
        $picBox.html('<a href="javascript:void(0);" class="ico-upload takePhoto" ></a>');
        document.documentElement.className = '';
    });

}

var init = function(){

    bindEvents();
};

init();