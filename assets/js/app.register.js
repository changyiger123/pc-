/**
 * @Author Brant Liu
 * @Desc TODO
 * @MailTo lbf1988@qq.com
 * @Date 2017/09/01
 */
layui.use('layer', function() {
    var layer = layui.layer;
    var psd = $("input[name='psd']").val();
    var yzm = $("input[name='yzm']").val();
    var rename = /^[a-zA-Z][a-zA-Z0-9]{6,16}$/;
    var rmobile = /^1[3|4|5|8][0-9]\d{8}$/;
    $("input[name='username']").blur(function(){
        var username = $("input[name='username']").val();
        if(!rename.test(username)){
            this.placeholder='请重新输入正确用户名';
            this.value='';
        }
    })
    $("input[name='mobile']").blur(function(){
        var mobile = $("input[name='mobile']").val();
        if(!rmobile.test(mobile)){
            this.placeholder='不是完整的11位手机号';
            this.value=''
        }
    })
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
        var mobile = $("input[name='mobile']").val();
        if(!rmobile.test(mobile)){
            alert('请输入正确的手机号码！')
        }else{
            ajaxData('code/send.html',"username="+mobile+"&type=reg",function(data){
                console.log(data);
                if(data.code==0){
                    settime(that);
                    layer.msg("验证码已发送到您的手机");
                }else{
                    layer.msg(data.message, {icon: 5});
                }
            })
        }
    })
    $(".btn").on("click",function(){
        var username = $("input[name='username']").val();
        var mobile = $("input[name='mobile']").val();
        var yzm = $("input[name='yzm']").val();
        var psd = $("input[name='psd']").val();
        if($("input[type='checkbox']").is(':checked')){
            ajaxData('register.html',"username="+username+"&password="+md5(psd)+"&code="+yzm+"&mobile="+mobile,function(data){
                if(data.code==0){
                    window.location.href = window.BASE_URL + "/";
                }else{
                    layer.msg(data.message, {icon: 5});
                }
            })
        }else{
            layer.msg("请勾选阅读并同意该协议", {icon: 5});
        }
    })
});