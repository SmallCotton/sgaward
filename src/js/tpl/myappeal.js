
exports.appealList = _.template(
    '<% appealList.forEach(function(v, i){ %>'+
    '<div class="cell">'+
        '<div class="txt-box">'+
            '<p class="p1 cl">'+
                '<span class="fl"><%- v.appealName %></span>'+
                '<%if(v.state==3){%>'+
                    '<a href="/appealResult.html?state=<%- v.state%>" class="arr arrl">审核成功</a>'+
                '<%i}else if(v.state==2){%>'+
                    '<a href="/appealResult.html?state=<%- v.state%>" class="arr arrh">审核失败</a>'+
                '<%i}else{%>'+
                    '<span class="fr">审核中</span>'+
                '<%i}%>'+
            '</p>'+
            '<p class="p2">'+
                '<span class="label">提交时间</span>'+
                '<span class="t2">'+
                '<%- dateFormat(v.submitTime, "yyyy.mm.dd") %>' +
                '</span>'+
            '</p>'+
        '</div>'+
    '</div>'+
    '<%});%>'
)