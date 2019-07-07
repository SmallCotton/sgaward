
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