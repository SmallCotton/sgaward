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