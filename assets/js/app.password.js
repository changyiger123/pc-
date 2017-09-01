/**
 * Created by chang on 2017/9/1.
 */
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
var $step = $("#step");
var $index = $("#index");

$step.step({
    index: 0,
    time: 500,
    title: ["验证原手机", "验证新手机", "修改完成"]
});

$index.text($step.getIndex());

$("#prevBtn").on("click", function() {
    $step.prevStep();
    $index.text($step.getIndex());
});
$('.getold').on('click',function(){
    var that=this;
    var oldMobile=$("input[name='oldMobile']").val();
    if(oldMobile==''){
        alert('用户名不能为空')
    }else{
        ajaxData('code/send.html',"username="+oldMobile+"&type=Old",function(data){
            console.log(data);
            if(data.code==0){
                settime(that);
                alert('验证码已发送到您的手机');
            }else{
                alert(data.message);
            }
        })
    }
})
$('.getnew').on('click',function(){
    var thats=this;
    var newMobile=$("input[name='newMobile']").val();
    if(newMobile==''){
        alert('用户名不能为空')
    }else{
        ajaxData('code/send.html',"username="+newMobile+"&type=New",function(data){
            console.log(data);
            if(data.code==0){
                settime(thats);
                alert('验证码已发送到您的手机');
            }else{
                alert(data.message);
            }
        })
    }
})

var a=0;
$("#nextBtn").on("click", function() {
    a++;
    $step.nextStep();
    $index.text($step.getIndex());
    var oldMobile=$("input[name='oldMobile']").val();
    var oldCode=$("input[name='oldCode']").val();
    var newMobile=$("input[name='newMobile']").val();
    var newCode=$("input[name='newCode']").val();
    if(a==2){
        ajaxData("user/mobile.html","oldMobile="+oldMobile+"&newMobile="+newMobile+"&oldCode="+oldCode+"&newCode="+newCode,function(data){
            console.log(data);
            if(data.code==0){
                $('.srk').children().eq(2).html('<h1 style="font-size: 24px;text-align: center;line-height:30px;">修改成功!</h1>');
                alert('修改成功')
                window.location.href='/profile.html'
            }else if(data.code==-2){
                alert(data.message);
                $('.srk').children().eq(2).html('<h1 style="font-size: 24px;text-align: center;line-height:30px;">修改失败!</h1>');
                location.reload();
                a=0;
            }
        });
    }
    $('.srk').children().eq(a).show().siblings().hide();
});






layui.use('upload', function(){
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
        elem: '#test3'
        ,url: '/uploader.html'
        ,method:'post'
        ,data:{
            type:'avatar'
        }
        ,accept:'images'
        ,auto:true
        ,size:2000
        ,multiple:false
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                //console.log(result);
                $('#demo3').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res,index,upload){
            //如果上传失败
            //console.log(res);
            var imgback=res.content.url;
            //console.log(imgback)
            //console.log(imgback);
            if(res.code == 0){

                $("input[name='businessUrl']").val(imgback);
                $('#demo1').src=imgback;
//                      $(this).css("background-image","url(imgback)");
                alert('上传成功');
            }

            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
    //执行实例
});