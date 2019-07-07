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



