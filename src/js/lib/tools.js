function kv(k){
    var reg = new RegExp(k + '=([^&]+)').exec(location.search);
    return reg ? reg[1] : null;
}

function dateFormat(date, fmt) {
    date = date instanceof Date ? date : new Date(date);
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var toast = function(text, fn){
    var id = 'toast_'+ +new Date();
    var $el = $('<div class="toast" id="'+ id +'">'+ text +'</div>');
    if ($('.toast').length) {
        $('.toast').remove();
    }
    $el.appendTo(document.body);
 
    $el.css({
        left: '50%',
        marginLeft: -1 * $el.outerWidth()/2
    });
    $el.fadeIn('fast');

    setTimeout(function(){
        $el.fadeOut('fast', function(){
            $el.remove();
            fn && fn();
        });
    },1200);
};

function toJson (res){
    var res = res || {};
    if (res && typeof res == 'string'){
        res = JSON.parse(res);
    }
    return res;
};  

function checkName (char){
    var reg = /^[\u4e00-\u9fa5][\u4e00-\u9fa5·]{1,15}$/;
    return reg.test(char);
};
function checkPhone (num){
    var reg = /^(1)\d{10}$/;
    return reg.test(num);
};
function checkIdcard (num){
    var reg = /[0-9]{17}[0-9X]/;
    return reg.test(num);
};

exports.dateFormat = dateFormat;
exports.kv = kv;
exports.toast = toast;
exports.toJson = toJson;
exports.checkName = checkName;
exports.checkPhone = checkPhone;
exports.checkIdcard = checkIdcard;

