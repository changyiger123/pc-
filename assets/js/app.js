/**
 * @Author Brant Liu
 * @Desc TODO
 * @MailTo lbf1988@qq.com
 * @Date 2017/09/01
 */
function ajaxData(url,dataParams,callback,methodType){
    var type = methodType || "POST";
    $.ajax({
        url: window.BASE_URL+"/"+url,
        type:type,
        dataType:"json",
        data: dataParams,
        success: function(data){
            callback(data);
        }
    });
}
$('#ewm').mouseenter(function(){
    $('#dewm').show();
}).mouseleave(function(){
    $('#dewm').hide();
})