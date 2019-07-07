(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var tools = require('./lib/tools');
var api = require('./lib/api');
var tpl = require('./tpl/index');
var com = require('./lib/common');
var $signBox = $('#signBox');
var $dailyTask = $('#dailyTask');
var $downloadTask = $('#downloadTask');
var $num = $('.num');
var $feedBackUrl = $('.feedBackUrl')
var $alertBox = document.getElementById('alertBox');
var $btmBits = $('#btmBits');
var objbtn = null;

var as = function(c){
    document.documentElement.className = 'alertshow';
    $alertBox.className = "alert-box "+c;
};

window.SeMobAwardUtilsH5 = {
    signStatus: function(res){
        var res = tools.toJson(res);
        if(res.code==0){

            var arr = _.filter(res.data.signList, function(o){
                return o.status == 2;
            });
            res.data.num = arr.length;
            $signBox.html(tpl.signStatus(res.data));
        }else{
            tools.toast(res.msg);
        }
    },
    doSign: function(res){
        var res = tools.toJson(res);
        if(res.code==0){
            var data = res.data && res.data.awardList && res.data.awardList[0];
            var _html = '';
            if(data.type==1){
                _html = data.num/100 +'元现金红包';
                $num.html(data.num/100);
                as('qdm');
            }else if(data.type==2){
                _html = data.num +'阅豆';
                $num.html(data.num);
                as('qdyd');
            }
            $signBox.find('.p3').remove();
            $signBox.append('<p class="p3"><span>本轮获得：'+ _html +'</span><a href="/myawards.html">查看</a></p>')
        }else{
            tools.toast(res.msg);
        }
    },
    receiveAward: function(res){
        var res = tools.toJson(res);
        console.log(res), 'ccc';
        if(res.code==0){
            var data = res.data && res.data.awardList && res.data.awardList[0];
            if(data.type==1){
                $num.html(data.num/100);
            }
            as('rwsuc');
        }else{
            as('rwerr');
        }
        if(objbtn){
            objbtn.className = 'btn disabled';
            objbtn.innerHTML = '已完成';
        }
    },
    downloadTaskStatus: function(res){
        var res = tools.toJson(res);
        //console.log(res);
        if(res.code==0){
            $('#downloadTaskTit').show();
            $downloadTask.html(tpl.downloadTaskStatus(res.data));
        }else{
            tools.toast(res.msg);
        }
    }
};


var bindEvents = function(){
    $signBox.on('click', '.sign-bean-box a', function(e){
        if(!com.checkNetwork()) return false;
        var $this = $(this);
        if($this.hasClass('sel')){
            return false;
        }else{
            if(com.doLogin()){
                var prevall = $this.prevAll();
                if(prevall.length>0 && prevall.not('.sel').length>0){
                    // com.msgshow('msgbox1', {
                    //     msg: '请按照顺序签到哦～'
                    // }); 
                    tools.toast('请完成今天的签到');
                }else{
                    if(com.checkLimitsBlack(true)==true && com.checkLimitsAppeal(true)==true && com.checkLimitsPhone(true)==true){
                        api.getRequest('/api/task/sign/do_sign', '', 'doSign');
                    }
                }
            }

        }

    });
    $('#dailyTask').on('click', '.lbtn', function(e){
        var $li = $(this).parent('li');
        var taskId = $li.attr('data-taskId');
        objbtn = this;
        api.getRequest('/api/task/daily/receive_award', {task_id: taskId||''}, 'receiveAward');
    });
    
    $downloadTask.on('click', '.lbtn', function(e){
        var $li = $(this).parent('li');
        var appid = $li.attr('data-appid');
        objbtn = this;
        api.getRequest('/api/task/download/request_receive_award', {app_id: appid||''}, 'receiveAward');
    });

    $downloadTask.on('click', '.btnw, .cbtn', function(e){
 
        if(com.doLogin()==true && com.checkLimitsPhone(true)==true){
        
            var $li = $(this).parent('li');
            var data = {};
            data.downloadUrl = $li.attr('data-downloadUrl');
            data.appId = $li.attr('data-appId');
            data.appName = $li.attr('data-appName');
            data.pname = $li.attr('data-pName');
            var code = api.getDownloadStatus(data);
            switch(code){
                case 1:
                    api.doTaskDownloadApk(data);
                    api.showToast('准备为您下载'+appName);
                    break;
                case 3:
                    api.reTaskDownloadApk(data);
                    break;
                case 4:
                    api.installDownloadApk(data);
                    break;
                case 5:
                    api.startupDownloadApk(data);
                    api.showToast('准备为您打开'+appName);
                    break;
                case 2:
                    api.showToast('正在下载中');
                    break;
                case 6:
                    api.showToast('打开失败');
                    break;              
            }

        }

    });
};


var init = function(){
    //签到
    api.getRequest('/api/task/sign/status', '', 'signStatus');

    //下载应用任务
    api.getRequest('/api/task/download/task_status', '', 'downloadTaskStatus');
    
    com.dailyTask();
    
    com.getUserLimits();

    bindEvents();
};

init();
},{"./lib/api":2,"./lib/common":3,"./lib/tools":4,"./tpl/index":5}],2:[function(require,module,exports){

//ajax请求
function getRequest (url, data, cb){
    try{
        var data = data;
        if(data){
            data = JSON.stringify(data)
        }
        window.SeMobAwardUtils.getRequest('http://hongbao.mse.sogou.com'+url+'?', data, 'window.SeMobAwardUtilsH5.'+cb);
    }catch(e){
        console.log(e)
    }
}

function submitVerified (url, data, img, cb){
    try{
        var data = data;
        if(data){
            data = JSON.stringify(data)
        }
        window.SeMobAwardUtils.submitVerified('http://hongbao.mse.sogou.com'+url+'?', data, img, 'window.SeMobAwardUtilsH5.'+cb);
    }catch(e){
        console.log(e)
    }
}

//红包返回按钮
function closeRedPackage (){
    try{
        window.SeMobAwardUtils.closeRedPackage();
    }catch(e){
        console.log(e)
    }
}


//获取用户信息
function getUserInfoJsonStr (){
    try{
        var res = window.SeMobAwardUtils.getUserInfoJsonStr() || {};
        if (res && typeof res == 'string'){
            res = JSON.parse(res);
        }
        return res;
    }catch(e){
        return {code:-1};
    }
}

//去首页页面
function gotoBrowserMainPage (){
    try{
       return window.SeMobAwardUtils.gotoBrowserMainPage();
    }catch(e){
        console.log(e)
    }
}

//身份认证拍照图片压缩
function takePhoto (){
    try{
       return window.SeMobAwardUtils.takePhoto('window.SeMobAwardUtilsH5.takePhoto');
    }catch(e){
        console.log(e)
    }
}

//绑定手机号
function bindPhone (){
    try{
        alert(11)
       return window.SeMobAwardUtils.bindPhone();
    }catch(e){
        console.log(e)
    }
}

//绑定提现账户
function bindAlipay (){
    try{
       return window.SeMobAwardUtils.bindAlipay();
    }catch(e){
        console.log(e)
    }
}
function bindWechat (){
    try{
       return window.SeMobAwardUtils.bindWechat();
    }catch(e){
        console.log(e)
    }
}

//我的红包页面: 点击进⼊入账户管理页面
function gotoAccountManagerPage (){
    try{
       return window.SeMobAwardUtils.gotoAccountManagerPage();
    }catch(e){
        console.log(e)
    }
}

//下载任务 状态
function getDownloadStatus (data){
    try{
       return window.SeMobAwardUtils.getDownloadStatus(JSON.stringify(data));
    }catch(e){
        console.log(e)
    }
}

//status =1 则调用
function doTaskDownloadApk (data){
    try{
       return window.SeMobAwardUtils.doTaskDownloadApk(JSON.stringify(data));
    }catch(e){
        console.log(e)
    }
}

//status =3 则调用
function reTaskDownloadApk (data){
    try{
       return window.SeMobAwardUtils.reTaskDownloadApk(JSON.stringify(data));
    }catch(e){
        console.log(e)
    }
}

//status =4 则调用
function installDownloadApk (data){
    try{
       return window.SeMobAwardUtils.installDownloadApk(JSON.stringify(data));
    }catch(e){
        console.log(e)
    }
}

//status =5 则调用
function startupDownloadApk (data){
    try{
       return window.SeMobAwardUtils.startupDownloadApk(JSON.stringify(data));
    }catch(e){
        console.log(e)
    }
}
 
//status =2 / 6 则调用
function showToast (){
    try{
       return window.SeMobAwardUtils.showToast();
    }catch(e){
        console.log(e)
    }
}

//搜索任务
function doTaskSearch (taskId){
    try{
       return window.SeMobAwardUtils.doTaskSearch(taskId, 2);
    }catch(e){
        console.log(e)
    }
}

//阅读任务
function doTaskRead (taskId){
    try{
       return window.SeMobAwardUtils.doTaskRead(taskId, 1);
    }catch(e){
        console.log(e)
    }
}

//反馈url
function getFeedBackUrlStr (){
    try{
       return window.SeMobAwardUtils.getFeedBackUrlStr();
    }catch(e){
        console.log(e)
    }
}

//反馈url
function loginInApp (){
    try{
       return window.SeMobAwardUtils.loginInApp();
    }catch(e){
        console.log(e)
    }
}


exports.getRequest = getRequest;
exports.submitVerified = submitVerified;

exports.gotoAccountManagerPage = gotoAccountManagerPage;
exports.bindWechat = bindWechat;
exports.bindAlipay = bindAlipay;
exports.bindPhone = bindPhone;
exports.takePhoto = takePhoto;
exports.gotoBrowserMainPage = gotoBrowserMainPage;
exports.getUserInfoJsonStr = getUserInfoJsonStr;

exports.doTaskDownloadApk = doTaskDownloadApk;
exports.reTaskDownloadApk = reTaskDownloadApk;
exports.installDownloadApk = installDownloadApk;
exports.startupDownloadApk = startupDownloadApk;
exports.showToast = showToast;

exports.doTaskSearch = doTaskSearch;
exports.doTaskRead = doTaskRead;
exports.getDownloadStatus = getDownloadStatus;
exports.closeRedPackage = closeRedPackage;
exports.getFeedBackUrlStr = getFeedBackUrlStr;

exports.loginInApp = loginInApp;
},{}],3:[function(require,module,exports){
var api = require('../lib/api');
var tools = require('../lib/tools');

var msgtpl = require('../tpl/msg');


$('._back').on('click', function(){
	history.go(-1);
});
$('body').on('click', '._close', function(e){
	document.documentElement.className = '';
	$('#alertBox')[0].className = "alert-box ";
	$('#alertBox').find('.msg-box').remove();

});

$('.closeRedPackage').on('click', function(){
	api.closeRedPackage();
});

$('.checkLoginBtn').on('click', function(){
	if(doLogin()){

	}else{
		return false;
	}
	
});


var getUserInfo = function(cb){
	try{
		var res =  api.getUserInfoJsonStr();
		cb && cb(res);
	 }catch(e){
		 console.log(e)
	 }
}

var doLogin = function(){

	var userinfo = tools.toJson(api.getUserInfoJsonStr());
	if(userinfo.code!=0){
		api.loginInApp();
		return false;
	}else{
		return true;
	}
	
}


var getUserLimits = function(cb){
	if(!window.userLimits){
		window.SeMobAwardUtilsH5 = window.SeMobAwardUtilsH5 || {};
		window.SeMobAwardUtilsH5.userLimits = function(res){
			var res = tools.toJson(res);
			if(res.code==0){
				window.userLimits = res.data;
				if(window.pageName=='index'){
					if(res.appealing == 1){
						$('#btmBits').addClass('myap');
					}
					if(res.inBlackList == 1){
						$('#btmBits').addClass('ap');
					}
				}
				cb && cb();
			}
		}
		api.getRequest('/api/user/get_user_info', '', 'userLimits');
	}
};

var checkNetwork = function(){
	if(!navigator.onLine){
		tools.toast('网络异常，请稍后再试');
		return false;
	}else{
		return true;
	}
}
var checkLimitsPhone = function(cb){
	if(window.userLimits){
		var lock = !!userLimits.mobile;
		if(!cb){
			return lock;
		}else{
			if(!lock){
				api.bindPhone();
				return false;
			}else{
				return true;
			}
		}
	}
}

var msgshow = function(box, data){
	$('#alertBox').find('.msg-box').remove();
	$('#alertBox').append(msgtpl[box](data));
	document.documentElement.className = 'alertshow';
}

var checkLimitsBlack = function(cb){

	if(window.userLimits){
		var lock = !userLimits.inBlackList;
		if(!cb){
			return lock;
		}else{
			if(!lock){
				msgshow('msgbox2', {
					msg: '账号存在异常，无法获得任务奖励',
					my: false
				});
				return false;
			}else{
				return true;
			}
		}
	}

}

var checkLimitsAppeal = function(cb){

	if(window.userLimits){
		var lock = !userLimits.appealing;
		if(!cb){
			return lock;
		}else{
			if(!lock){
				msgshow('msgbox2', {
					msg: '账号存在异常，无法获得任务奖励',
					my: true
				});
				return false;
			}else{
				return true;
			}
		}
	}

}

// 每日任务相关模块
var dailyTask = function(){
	var api = require('../lib/api');
	var tpl = require('../tpl/index');
	var tools = require('../lib/tools');
	var $dailyTask = $('#dailyTask');

    $dailyTask.on('click', '.btnw, .cbtn', function(e){
		if(doLogin()){
			var $li = $(this).parent('li');
			var taskId = $li.attr('data-taskId');

			if(taskId==10001){
				api.doTaskRead();
			}else{
				api.doTaskSearch();
			}
		}
	});
	window.SeMobAwardUtilsH5 = window.SeMobAwardUtilsH5 || {};
	window.SeMobAwardUtilsH5.dailyTaskStatus = function(res){
		var res = tools.toJson(res);
        console.log(res, 'dailyTaskStatus');

        if(res.code==0){

            $('#dailyTaskTit').show();
            $dailyTask.html(tpl.dailyTaskStatus(res.data));
        }else{
            tools.toast(res.msg);
        }
	};
	
    //每日任务
	api.getRequest('/api/task/daily/task_status', '', 'dailyTaskStatus');
	
}



exports.getUserInfo = getUserInfo;
exports.dailyTask = dailyTask;
exports.doLogin = doLogin;
exports.checkLimitsPhone = checkLimitsPhone;
exports.checkLimitsBlack = checkLimitsBlack;
exports.checkLimitsAppeal = checkLimitsAppeal;
exports.msgshow = msgshow;
exports.getUserLimits = getUserLimits;
exports.checkNetwork = checkNetwork;




},{"../lib/api":2,"../lib/tools":4,"../tpl/index":5,"../tpl/msg":6}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
exports.signStatus = _.template(
    '<p class="p1">已签到&nbsp;<i><%- num %></i>&nbsp;次，更多现金红包等你拿！</p>'+
    '<p class="p2">14天内签满 1/3/7 次最高可领98元</p>'+
    '<div class="sign-bean-box cl">'+
    '<% signList.forEach(function(v, i){ %>'+
        '<%if(i<6){%>' +
        '<a href="javascript:void(0);" class="<% if(v.awardList[0].type==1){%>sm<%}else{%>sb<%} %> <%if(v.status==2){%> sel <%}%>">'+
            '<p>第<%- (i+1) %>次</p>'+
        '</a>'+
        '<%}else if(i==6){%>'+
            '<a href="javascript:void(0);" class="sl <%if(v.status==2){%> sel <%}%>"></a>' +
        '<%}%>' +
    '<%});%>' +
    '</div>' +
    '<p class="p3"><span>立即签到领取现金红包和阅豆</span></p>'
)

exports.dailyTaskStatus = _.template(
    '<% taskList.forEach(function(v, i){ %>'+
    '<li data-taskId=<%- v.taskId%> >'+
        '<div class="pic <%if(v.taskId==10001){%>zixun<%}else{%>search<%}%>"></div>'+
        '<div class="txt-box">'+   
            '<p class="p1"><%- v.taskName%></p>'+
            '<p class="p2"><%- v.conditionList[0].opDesc%></p>'+
        '</div>'+
        // '<a class="btn btnw">'+
        '<% if(v.taskStatus==2){ %>'+
            '<a href="javascript:void(0);" class="btn lbtn">领取红包</a>'+
        '<% }else if(v.taskStatus==3){ %>'+
            '<a class="btn disabled">已完成</a>'+
        '<% }else{ %>'+
            '<% if(v.conditionList[0].finishNum>0 && v.conditionList[0].finishNum<v.conditionList[0].opNum){ %>'+
                '<% if(v.taskId==10001){ %>'+
                    '<a class="btn cbtn">继续阅读</a>'+
                '<% }else{ %>'+
                    '<a class="btn cbtn">继续搜索</a>'+
                '<% } %>'+
            '<% }else{ %>'+
                '<% if(v.taskId==10001){ %>'+
                    '<a class="btn btnw">去阅读</a>'+
                '<% }else{ %>'+
                    '<a class="btn btnw">去搜索</a>'+
                '<% } %>'+
            '<% } %>'+
            
        '<% } %>'+
        // '</a>'+
    '</li>'+
    '<%});%>'
)

exports.downloadTaskStatus = _.template(
    '<% taskList.forEach(function(v, i){ %>'+
    '<li  data-taskId="<%- v.appId%>"  data-downloadUrl="<%- v.downloadUrl%>" data-appId="<%- v.appId %>" data-appName="<%- v.appName%>" data-pName="<%- v.pname%>">'+
        '<div class="pic">'+
            '<img src="<%- v.imageUrl%>">'+
        '</div>'+
        '<div class="txt-box">'+
            '<p class="p1"><%- v.appName%></p>'+
            '<p class="p2">+最高5元现金</p>'+
        '</div>'+
        '<% if(v.status==1){%>'+
            '<a href="javascript:void(0);" class="btn lbtn">领取红包</a>'+
        '<% }else if(v.status==2){%>'+
            '<a class="btn disabled">已完成</a>'+
        '<% }else{%>'+
            '<a class="btn btnw">抢红包</a>'+
        '<% }%>'+
    '</li>'+
    '<%});%>'
)
},{}],6:[function(require,module,exports){

exports.msgbox1 = _.template(
    '<div class="msg-box msg-box1">'+
        '<p class="msg" id="msg"><%- msg%></p>'+
        '<div class="btn-box">'+
            '<a href="javascript:void(0);" class="close _close">确定</a>'+
        '</div>'+
    '</div>'
);

exports.msgbox2 = _.template(
    '<div class="msg-box msg-box2">'+
        '<p class="tp">提示</p>'+
        '<p class="msg" id="msg"><%- msg%></p>'+
        '<div class="btn-box">'+
            '<%if(my){%>'+
                '<a href="/myappeal.html">去申诉</a>'+
            '<%}else{%>'+
                '<a href="/appeal.html">去申诉</a>'+
            '<%}%>'+
            '<a href="javascript:void(0);" class="close _close">确定</a>'+
        '</div>'+
    '</div>'
);
},{}]},{},[1]);
