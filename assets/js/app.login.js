/**
 * @Author Brant Liu
 * @Desc TODO
 * @MailTo lbf1988@qq.com
 * @Date 2017/09/01
 */
layui.use('layer', function(){
    var layer = layui.layer;
    $("#loginBtn").on("click",function(e){
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var rememberMe = $("input[name='rememberMe']").is(':checked');
        ajaxData("login/captcha.html","username="+username,function(result){
            if(result.content){
                layer.open({
                    type: 1
                    ,title: false
                    ,closeBtn: false
                    ,area: '350px;'
                    ,shade: 0.5
                    ,id: 'LAY_layuipro'
                    ,btn: ['取消', '确认']
                    ,moveType: 1
                    ,content:'<div class="yzm" style="width:330px;height:140px;background: #ffffff;padding-top:20px;padding-left:20px;"><p style="height:50px;font-size:17px;line-height: 50px;margin-bottom: 5px;"><span>验证码</span><input type="text" name="captcha" style="width:196px;height:46px;"/></p><h6><b style="color:#666666;font-size: 12px;margin-left: 75px;line-height: 18px;">输入下图中的字符</b></h6><p class="yzpic" style="height:55px;padding-left: 75px;"><img id="psrc" src="'+window.BASE_URL+'/captcha.jpg" style="width:130px;height:55px;"/><span id="captcha"><a href="javascript:;">看不清，换一张</a></span></p></div>'
                    ,success: function(layero){
                        $('#captcha').click(function () {
                            $('#psrc').attr('src', window.BASE_URL+'/captcha.jpg?' + new Date().getTime());
                        });
                        var btn = layero.find('.layui-layer-btn');
                        btn.css('text-align', 'center');
                        btn.find('.layui-layer-btn0').css({'background-color':'#ffffff','border-color':'#d6d7dc','color':'#333'})
                        btn.find('.layui-layer-btn1').click(function(){
                            var captcha=$("input[name='captcha']").val();
                            if(captcha==''){
                                layer.msg("请输入验证码");
                            }else{
                                ajaxData("login.html","username="+username+"&password="+md5(password)+"&rememberMe="+rememberMe+"&captcha="+captcha,function(data){
                                    if(data.code==0){
                                        window.location.href = window.BASE_URL+"/";
                                    }else{
                                        layer.msg(data.message, {icon: 5});
                                    }
                                });
                            }
                        })
                    }
                });
            }else{
                ajaxData("login.html","username="+username+"&password="+md5(password)+"&rememberMe="+rememberMe,function(data){
                    if(data.code==0){
                        window.location.href = window.BASE_URL+"/";
                    }else{
                        layer.msg(data.message, {icon: 5});
                    }
                });
            }
        });
    });
});