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
            val.style.backgroundColor='#ffa800';
            val.value="获取验证码";
            countdown = 60;
            return;
        } else {
            val.setAttribute("disabled", true);
            val.style.backgroundColor='#cccccc';
            val.value="重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function() {
            settime(val)
        },1000)
    }
    var rmobile = /^1[3|4|5|8][0-9]\d{4,8}$/;
    $("input[name='username']").blur(function(){
        var username = $("input[name='username']").val();
        if(!rmobile.test(username)){
            this.placeholder='不是完整的11位手机号或者正确的手机号前七位';
            this.value=''
        }
    });
    $('.getyzm').on('click',function(){
        var that=this;
        var username = $("input[name='username']").val();
        if(username==''){
            layer.msg("此用户尚未注册", {icon: 5});
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