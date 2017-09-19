/**
 * @Author Brant Liu
 * @Desc TODO
 * @MailTo lbf1988@qq.com
 * @Date 2017/09/01
 */
var layer,upload;
layui.use(['layer','upload'], function(){
    layer = layui.layer,
    upload = layui.upload;
});
function ajaxData(url,dataParams,callback,methodType){
    var type = methodType || "POST";
    $.ajax({
        url: window.BASE_URL+"/"+url,
        type:type,
        dataType:"json",
        data: dataParams,
        success: function(data){
            callback(data,layer);
        }
    });
}
function uploadPlugin(upload,options){
    var defaults={
        elem:"#test1",
        url: window.BASE_URL+'/uploader.html',
        data:{
            type:'business'
        },
        previewElem:"#demo1",
        inputHiddenElem:"input[name='businessUrl']"
    };
    var settings = $.extend(defaults,options);
    var uploadInst = upload.render({
        elem: settings.elem
        ,url: settings.url
        ,data:settings.data
        ,method:'post'
        ,accept:'images'
        ,auto:true
        ,size:2000
        ,multiple:false
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $(settings.previewElem).attr('src', result);
            });
        }
        ,done: function(res,index,upload){
            var imgback=res.content.url;
            if(res.code == 0){
                $(settings.inputHiddenElem).val(imgback);
                $(settings.previewElem).src=imgback;
                layer.msg('上传成功');
            }
        }
        ,error: function(){
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
}
/**
 * 检查是否认证
 * */
function companyAuthInfo(){
    ajaxData("company/auth/info.html",null,function(result){
        if(result.code==30000){
            $('.wrz').attr('src',window.BASE_URL+'/assets/img/yrz.png');
            $('.identifybody').css('background','url(/assets/img/sy_bg.png)');
        }else if(result.code==30003){
            $('.rz').html('<dl style="margin-top:20px"><dt style="margin-bottom:20px"><img src="'+window.BASE_URL+'/assets/img/zy_dd.png" alt=""/></dt><dd>您的企业认证正在审核中，请耐心等待......</dd></dl>');
        }else if(result.code==3004){
            $('.rz').html('<h4>您的企业认证审核未通过请重新认证</h4><a href="'+window.BASE_URL+'/company/auth.html">立即认证</a>');
        }else{
            $('.rz').html('<h4>请进行企业认证</h4><p>为了保证您的数据安全，项目管理功能需在企业认证后使用</p><a href="'+window.BASE_URL+'/company/auth.html">立即认证</a>');
        }
    },"GET");
}
function companyAuthForm(){
    $(".layui-side").remove();
    $(".identifybody").removeClass("layui-body");
    ajaxData("company/auth/info.html",null,function(result){
        if(result.code==30003){
            $('.upbody').html('<dl style="margin-top:20px"><dt style="margin-bottom:20px"><img src="'+window.BASE_URL+'/assets/img/zy_dd.png" alt=""/></dt><dd>您的企业认证正在审核中，请耐心等待......</dd></dl>')
                .css("text-align","center");
            $(".tj").remove();
        }else if(result.code==30000){
            $('.upbody').html('<div style="text-align: center">您已经是认证用户，请勿重复提交</div>');
        }
    },"GET");
    layui.use('upload', function(){
        var upload = layui.upload;
        uploadPlugin(upload);
        uploadPlugin(upload,{
            elem: '#test2'
            ,data:{
                type:'cert'
            }
            ,previewElem:"#demo2"
            ,inputHiddenElem:"input[name='certificatesUrl']"
        });
    });
    $('.tj').on('click',function(){
        var cname = $("input[name='cname']").val();
        var address = $("input[name='address']").val();
        var businessCode = $("input[name='businessCode']").val();
        var businessUrl = $("input[name='businessUrl']").val();
        var certificatesCode = $("input[name='certificatesCode']").val();
        var certificatesUrl = $("input[name='certificatesUrl']").val();
        var formData = new Array();
        formData.push("cname="+cname);
        formData.push("address="+address);
        formData.push("businessCode="+businessCode);
        formData.push("businessUrl="+businessUrl);
        if($.trim(certificatesCode).length>0){
            formData.push("certificatesCode="+certificatesCode);
        }
        if($.trim(certificatesUrl).length>0){
            formData.push("certificatesUrl="+certificatesUrl);
        }
        formData.push("status=3");
        ajaxData("company/auth.html",formData.join('&'),function(data){
            if(data.code==0){
                $('.upbody').html('<dl style="margin-top:20px"><dt style="margin-bottom:20px"><img src="'+window.BASE_URL+'/assets/img/zy_dd.png" alt=""/></dt><dd>提交审核中，请耐心等待......</dd></dl>')
                    .css("text-align","center");
                $(".tj").remove();
            }else if(data.code==-2){
                layer.alert(data.message);
            }
        });
    })
}
/**
 * 扫描二维码下载
 * */
$('#ewm').mouseenter(function(){
    $('#dewm').show();
}).mouseleave(function(){
    $('#dewm').hide();
})
/**
 * 联系电话
 * */
$(document).on("click","#lxdh",function(){
    layer.open({
        title: '联系电话'
        ,area: ['350px','200px']
        ,offset: '300px'
        ,content:'<h5><b>免费热线:4000-518-571</b></h5>服务时间:周一至周六9:00-18:00'
    });
});
$('.mainlogo').on('click',function(){
    window.location.href = '/'+'index.html';
})