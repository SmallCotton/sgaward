exports.amountLimits = _.template(
    '<% configList.forEach(function(v, i){ %>'+
    '<a href="javascript:void(0);" class="<%if(i==0){%>sel<%}%>" data-amountLimit="<%- v.withdrawMoneyLimit%>" data-loginDayLimit="<%- v.loginDayLimit%>"  data-totalNum="<%- v.totalNum%>" data-remainNum="<%- v.remainNum %>"><%- v.withdrawMoneyLimit/100 %>元</a>'+
    '<%});%>'
)