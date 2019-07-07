(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.getUserInfoJsonStr = {
    "code": 0,
    "data": {
        "userid": "15546",
        "nickname": "dededede",
        "avatar_url": "http://images.xdf.cn/cms20150819/img/m/nav_icon/nav_toutiao.png"
    },
    "msg": "测试内容t383"
}

exports.signStatus = {
    "code": 0,
    "data": {
        "signList": [
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 1
            },
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 2
            },
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 2
            },
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 2
            },
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 2
            },
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 1
            },
            {
                "awardList": [
                    {
                        "name": "测试内容y667",
                        "num": 76317,
                        "type": 1
                    }
                ],
                "day": 51351,
                "status": 2
            }
        ]
    },
    "msg": "测试内容28l1"
}

exports.doSign = {
    "code": 0,
    "data": {
        "awardList": [
            {
                "name": "测试内容12h4",
                "num": 62582,
                "type": 1
            }
        ]
    },
    "msg": "测试内容5716"
}

exports.dailyTaskStatus = {
    "code": 0,
    "data": {
        "taskList": [
            {
                "conditionList": [
                    {
                        "finishNum": 2,
                        "opDesc": "测试内容x5c4",
                        "opNum": 25505,
                        "opType": 76661
                    }
                ],
                "taskId": 10001,
                "taskName": "测试内容7628",
                "taskStatus": 1
            },
            {
                "conditionList": [
                    {
                        "finishNum": 3,
                        "opDesc": "测试内容x5c4",
                        "opNum": 3,
                        "opType": 76661
                    }
                ],
                "taskId": 10002,
                "taskName": "测试内容7628",
                "taskStatus": 3
            },
            {
                "conditionList": [
                    {
                        "finishNum": 3,
                        "opDesc": "测试内容x5c4",
                        "opNum": 3,
                        "opType": 76661
                    }
                ],
                "taskId": 10002,
                "taskName": "测试内容7628",
                "taskStatus": 1
            }
        ]
    },
    "msg": "测试内容r24c"
}

exports.downloadTaskStatus = {
    "code": 0,
    "data": {
        "taskList": [
            {
                "appId": "测试内容73rz",
                "appName": "测试内容t5pd",
                "downloadUrl": "测试内容8162",
                "imageUrl": "http://images.xdf.cn/cms20150819/img/m/nav_icon/nav_toutiao.png",
                "pName": "测试内容e1o3",
                "size": "测试内容1d1m",
                "status": 0
            },
            {
                "appId": "测试内容73rz",
                "appName": "测试内容t5pd",
                "downloadUrl": "测试内容8162",
                "imageUrl": "http://images.xdf.cn/cms20150819/img/m/nav_icon/nav_toutiao.png",
                "pName": "测试内容e1o3",
                "size": "测试内容1d1m",
                "status": 1
            },
            {
                "appId": "测试内容73rz",
                "appName": "测试内容t5pd",
                "downloadUrl": "测试内容8162",
                "imageUrl": "http://images.xdf.cn/cms20150819/img/m/nav_icon/nav_toutiao.png",
                "pName": "测试内容e1o3",
                "size": "测试内容1d1m",
                "status": 2
            }
        ]
    },
    "msg": "测试内容t1ab"
}

exports.getMyCoupon = {
    "code": 0,
    "data": {
        "money": {
            "cashedAmount": 15782,
            "couponBalance": 35336,
            "withdrawLimit": 11565
        },
        "read": {
            "num": 18615
        }
    },
    "msg": "测试内容6lou"
}

exports.queryWithdrawConfig = {
    "code": 0,
    "data": {
        "configList": [
            {
                "amountLimit": 332,
                "loginDayLimit": 33,
                "remainNum": 9,
                "totalNum": 10
            },
            {
                "amountLimit": 432,
                "loginDayLimit": 333,
                "remainNum": 555,
                "totalNum": 222
            },
            {
                "amountLimit": 333,
                "loginDayLimit": 2,
                "remainNum": 11,
                "totalNum": 22
            }
        ]
    },
    "msg": "测试内容5227"
}

exports.submitWithdraw = {
    "code": 30,
    "data": {
        "cashOrderId": "测试内容p2q5"
    },
    "msg": "测试内容gf78"
}

exports.queryOrderStatus =  {
    "code": 1,
    "data": {
        "accountType": 64576,
        "cashMoney": 61085,
        "status": 25607
    },
    "msg": "测试内容61s8"
}

exports.queryCouponRecord =  {
    "code": 0,
    "data": {
        "pn": 38640,
        "ps": 45122,
        "recordList": [
            {
                "userCouponId": null,
                "couponSource": null,
                "couponMoney": null,
                "remainMoney": null,
                "endTime": 1562323864000,
                "userCouponState": null,
                "createTime": 1562323864000,
                "recordType": 2,
                "withdrawId": 2019070500000000035,
                "withdrawChannel": 2,
                "withdrawMoney": 10,
                "withdrawState": 3,
                "failReasonDesc": "",
                "cashedTime": null
            }, {
                "userCouponId": 94,
                "couponSource": "签 到获得红包",
                "couponMoney": 3,
                "remainMoney": 3,
                "endTime": 1564329599000,
                "userCouponState": 5,
                "createTime": 1561693636000,
                "recordType": 1,
                "withdrawId": null,
                "withdrawChannel": null,
                "withdrawMoney": null,
                "withdrawState": null,
                "failReasonDesc": null,
                "cashedTime": null
            }
        ]
    },
    "msg": "测试内容jeo5"
}

exports.receiveAward =  {
    "code": 10,
    "data": {
        "awardList": [
            {
                "name": "测试内容1139",
                "num": 113,
                "type": 1
            }
        ]
    },
    "msg": "测试内容35ua"
}
exports.zoomPhoto =  'img/bg.png';

exports.submitVerified =  {
    "code": 10,
    "data": {
        "requestNo": "测试内容l567"
    },
    "msg": "测试内容ws1m"
}

exports.submitVerified =  {
    "code": 0,
    "data": {},
    "msg": "测试内容3xw3"
}

exports.getAppealList =  {
    "code": 0,
    "data": {
        "appealList": [
            {
                "accountId": "测试内容h31i",
                "appealId": "测试内容cp81",
                "appealName": "测试内容l216",
                "nickName": "测试内容oe4c",
                "state": 0,
                "submitTime": 1562299740064
            },
            {
                "accountId": "测试内容h31i",
                "appealId": "测试内容cp81",
                "appealName": "测试内容l216",
                "nickName": "测试内容oe4c",
                "state": 1,
                "submitTime": 1462299740064
            },
            {
                "accountId": "测试内容h31i",
                "appealId": "测试内容cp81",
                "appealName": "测试内容l216",
                "nickName": "测试内容oe4c",
                "state": 2,
                "submitTime": 1362299740064
            },
            {
                "accountId": "测试内容h31i",
                "appealId": "测试内容cp81",
                "appealName": "测试内容l216",
                "nickName": "测试内容oe4c",
                "state": 3,
                "submitTime": 1262299740064
            }
        ]
    },
    "msg": "测试内容1c1j"
}
exports.userLimits = {
    "code": 0,
    "data": {
        "appealing": 1,
        "inBlackList": 1,
        "mobile": "17899"
    },
    "msg": "测试内容7635"
}
},{}],2:[function(require,module,exports){
var mock = require('./lib/mock.js');

window.SeMobAwardUtils = {};
window.SeMobAwardUtils.getRequest = function(url, data, cb){
    var name = cb.replace('window.SeMobAwardUtilsH5.', '');
    window.SeMobAwardUtilsH5[name](mock[name]);
    //return mock[name];
}

window.SeMobAwardUtils.getUserInfoJsonStr = function(){
    return mock.getUserInfoJsonStr;
}
},{"./lib/mock.js":1}]},{},[2]);
