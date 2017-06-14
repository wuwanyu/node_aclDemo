/**
 * Created by Administrator on 2015/11/16.
 */

var splitStr  = String.fromCharCode(0x01);

function getSplitStr(){
    return String.fromCharCode(0x01);
}

//angularJs https get方法封装
function angularHttpGet($http,url,params,callBack){
    $http({
        method  : 'GET',
        url     : url,
        params : params
    }).success(function(data) {
        callBack(data);
    });
}


//angularJs https Post方法封装
function angularHttpPost($http,url,formData,callBack){
    $http({
        method  : 'POST',
        url     : url,
        data    : $.param(formData),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    }).success(function(data) {
        callBack(data);
    });
}

//ajax Post方法封装
function ajaxFormPost(url,formData,callBack){
    $.ajax({
        type:'POST',
        dataType:'text',
        processData: false,  // 告诉JSLite不要去处理发送的数据
        contentType: false,   // 告诉JSLite不要去设置Content-Type请求头
        data:formData,
        url:url,
        success:function(data){
            data = JSON.parse(data);
            callBack(data);
        },
        error:function(data){
            console.log('error:',data)
            callBack(data);
        }
    });
}


function  setCurTab(preTabId,curTabId){

    $("ul.am-tabs-nav li[target='"+preTabId+"']").removeClass('am-active');
    $("ul.am-tabs-nav li[target='"+curTabId+"']").addClass('am-active');

    $("#"+preTabId).removeClass('am-in am-active');
    $("#"+curTabId).addClass('am-in am-active');
}


function  setCurTab(curTabId){
    var preTabId="";
    //遍历删除cur
    $( "ul.am-tabs-nav li" ).each(function(){
        if($(this ).hasClass("am-active")){
            preTabId=$(this).attr("target");
            $( this).removeClass("am-active" );
        }
    });

    $("ul.am-tabs-nav li[target='"+curTabId+"']").addClass('am-active');
    $("#"+preTabId).removeClass('am-in am-active');
    $("#"+curTabId).addClass('am-in am-active');
}






