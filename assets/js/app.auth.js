/**
 * Created by chang on 2017/9/1.
 */
layui.use('upload', function(){
    var upload = layui.upload;

    //执行实例
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: '/uploader.html'
        ,method:'post'
        ,data:{
            type:'business'
        }
        ,accept:'images'
        ,auto:true
        ,size:2000
        ,multiple:false
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                //console.log(result);
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res,index,upload){
            //如果上传失败
            var imgback=res.content.url;
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
    var uploadInst2 = upload.render({
        elem: '#test2'
        ,url: '/uploader.html'
        ,method:'post'
        ,data:{
            type:'cert'
        }
        ,accept:'images'
        ,auto:true
        ,size:2000
        ,multiple:false
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo2').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res,index,upload){
            //如果上传失败
            //console.log(res);
            var imgback=res.content.url;
            //console.log(imgback);
            if(res.code == 0){
                return layer.msg('上传成功');
                $('#demo2').src=imgback;
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
});
//        var businessUrl=localStorage.getItem("imgback");


$('.tj').on('click',function(){
    var cname = $("input[name='cname']").val();
    var address = $("input[name='address']").val();
    var businessCode = $("input[name='businessCode']").val();
    //console.log(businessCode);
    var businessUrl = $("input[name='businessUrl']").val();
    //console.log(businessUrl);
    ajaxData("company/auth.html","cname="+cname+"&address="+address+"&businessCode="+businessCode+"&businessUrl="+businessUrl+"&status=3",function(data){
        console.log(data);
        if(data.code==0){
//                    window.location.href = "${REQ}/";
            $('.identifybody').html('企业信息正在审核中');
            ajaxDataGet('')
        }else if(data.code==2){
            alert(data.message);
        }
    });

})