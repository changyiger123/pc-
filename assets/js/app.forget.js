/**
 * @Author Brant Liu
 * @Desc TODO
 * @MailTo lbf1988@qq.com
 * @Date 2017/09/01
 */
layui.use('layer', function(){
    var layer = layui.layer;
    var countdown=60;
    function settime(val) {
        if (countdown == 0) {
            val.removeAttribute("disabled");
            val.value="获取验证码";
            countdown = 60;
        } else {
            val.setAttribute("disabled", true);
            val.value="重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function() {
            settime(val)
        },1000)
    }
    $('.getyzm').on('click',function(){
        var that=this;
        var username = $("input[name='username']").val();
        if(username==''){
            layer.msg("用户名不能为空", {icon: 5});
        }else{
            ajaxData('code/send.html',"username="+username+"&type=reset",function(data){
                if(data.code==0){
                    settime(that);
                    layer.msg("验证码已发送到您的手机");
                }else{
                    layer.msg(data.message, {icon: 5});
                }
            })
        }
    })
    $('.btn').click(function(){
        var username = $("input[name='username']").val();
        var psd = $("input[name='psd']").val();
        var yzm = $("input[name='yzm']").val();
        if(yzm==''||username==''){
            layer.msg("用户名或验证码不能为空", {icon: 5});
        }else{
            ajaxData('forget.html',"username="+username+"&password="+md5(psd)+"&code="+yzm,function(data){
                if(data.code==0){
                    $('.registerinput').html('<h1 style="line-height: 155px">修改密码成功，页面正在跳转到登录页面......</h1>');
                    window.setTimeout(function(){
                        window.location.href = window.BASE_URL + "/";
                    },2000);
                }else{
                    layer.msg(data.message, {icon: 5});
                }
            });
        }
    })
});