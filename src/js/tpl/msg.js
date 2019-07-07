
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