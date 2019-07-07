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