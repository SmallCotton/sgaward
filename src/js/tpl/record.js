
exports.recordList = _.template(
    '<% recordList.forEach(function(v, i){ %>'+
        '<%if(v.recordType==1){%>'+

            '<div class="cell">'+
                '<p class="t1"><%- dateFormat(v.createTime, "yyyy.MM.dd hh:mm:ss") %></p>'+
                '<div class="txt-box">'+
                    '<p class="p1 cl">'+
                        '<span class="fl"><%- v.couponSource%></span>'+
                        '<span class="fr">+<%- v.couponMoney/100%>元</span>'+
                    '</p>'+
                    '<p class="p2">'+
                        '<%if(v.remainMoney){%>'+
                        '<span class="label">余额<%- v.remainMoney/100%>元</span>'+
                        '<%}%>'+
                        '<span class="label">有效期至</span>'+
                        '<span class="t2"><%- dateFormat(v.endTime, "yyyy.MM.dd hh:mm:ss") %></span>'+
                        '<span class="fr <%if(v.userCouponState!=5){%> tag <%}%>">'+
                            '<%if(v.userCouponState==1){%>'+
                                "可提取"+
                            '<%}else if(v.userCouponState==2){%>'+
                                "提现中"+
                            '<%}else if(v.userCouponState==3){%>'+
                                "已提现"+
                            '<%}else if(v.userCouponState==5){%>'+
                                "已过期"+
                            '<%}%>'+
                        '</span>'+
                    '</p>'+
                '</div>'+
            '</div>'+

        '<%}else if(v.recordType==2){%>'+
            
            '<div class="cell '+
            '<%if(v.withdrawState==2){%>'+
                'err'+
            '<%}else if(v.withdrawState==3){%>'+
                'suc'+
            '<%}%>'+
            '">'+
                '<p class="t1"><%- dateFormat(v.createTime, "yyyy.MM.dd hh:mm:ss") %></p>'+
                '<div class="txt-box">'+
                    '<p class="p1 cl">'+
                        '<span class="fl">'+
                        '<%if(v.withdrawState==1){%>'+
                            '提现中（约3~7天到账）'+
                        '<%}else if(v.withdrawState==2){%>'+
                        '<%if(v.failReasonDesc){%>'+
                            '<%- v.failReasonDesc%>'+
                        '<%}else{%>'+
                            "提现失败"+
                        '<%}%>'+
                        '<%}else if(v.withdrawState==3){%>'+
                            '<%if(v.withdrawChannel==1){%>'+
                                '成功提现到支付宝账户'+
                            '<%}else if(v.withdrawChannel==2){%>'+
                                '成功提现到微信账户'+
                            '<%}%>'+
                        '<%}%>'+
                        '</span>'+
                        '<span class="fr">-<%- v.withdrawMoney/100 %>元</span>'+
                    '</p>'+
                    '<p class="p2">'+
                        '<%if(v.withdrawState==3){%>'+
                            '<span class="label">到账时间</span>'+
                            '<span class="t2"><%- dateFormat(v.cashedTime, "yyyy.MM.dd hh:mm:ss") %></span>'+
                        '<%}else{%>'+
                            '<span class="label">申请提现时间</span>'+
                            '<span class="t2"><%- dateFormat(v.createTime, "yyyy.MM.dd hh:mm:ss") %></span>'+
                        '<%}%>'+
                    '</p>'+
                '</div>'+
            '</div>'+

        '<%}%>'+
    '<%});%>'
);