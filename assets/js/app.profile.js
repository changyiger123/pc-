/**
 * Created by chang on 2017/9/1.
 */
$.ajax({url:"profile/info",type:"GET",dataType:"json",success:function(result){
    if(result.code==0){
        $('.avatar').attr('src', result.content.owner.avatar); //图片链接（base64）
        $('.businessUrl').attr('src', result.content.subject.avatar); //图片链接（base64）
        //$('.certificatesUrl').attr('src', result.content.subject.certificatesUrl); //图片链接（base64）
        $('.realname').html(result.content.owner.realname);
        $('.mobile').html(result.content.owner.mobile);
        $('.cname').html(result.content.subject.cname);
        $('.address').html(result.content.subject.address);
        $('.businessCode').html(result.content.subject.businessCode);
        $('.certificatesCode').html(result.content.subject.certificatesCode);
    }
}});
//            $('.changeavtar').on('click',function(){
//                alert(1);
//            })
layui.use('upload', function(){
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
        elem: '#test3'
        ,url: 'uploader.html'
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
            var imgback=res.content.url;
            if(res.code == 0){
                //$("input[name='businessUrl']").val(imgback);
                ajaxData("user/avatar.html","avatar="+imgback,function(data){
                    if(data.code==0){
                        $('#demo3').src=imgback;
//                                    $('.btavatar').attr('src',imgback)
                        alert('头像修改成功')
                    }else if(data.code==-2){
                        alert('头像地址不能为空')
                    }

                })
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