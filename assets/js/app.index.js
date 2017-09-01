/**
 * Created by chang on 2017/9/1.
 */
layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element'], function(){
    var laydate = layui.laydate //日期
        ,laypage = layui.laypage //分页
        ,layer = layui.layer //弹层
        ,table = layui.table //表格
        ,carousel = layui.carousel //轮播
        ,upload = layui.upload //上传
        ,element = layui.element; //元素操作
    $.ajax({url:"/company/auth/info.html",type:"GET",dataType:"json",success:function(result){
        console.log(result);
        if(result.code==30000){
            $('.wrz').attr('src','/assets/img/yrz.png');
        }else if(result.code==30003){
            layer.msg(result.message);
            $('.rz').html('<dl style="margin-top:20px"><dt style="margin-bottom:20px"><img src="/assets/img/zy_dd.png" alt=""/></dt><dd>您的企业认证正在审核中，请耐心等待......</dd></dl>');
        }else{
            layer.msg(result.message);
            $('.rz').html('<h4>请进行企业认证</h4><p>您好，认证之后可以怎样怎样</p><a href="/company/auth.html">立即认证</a>');
        }
    }});


    $(document).on("click","#lxdh",function(){
        layer.open({
            title: '联系电话'
            ,area: '150px'
            ,content:'<h5><b>免费热线:4000-518-571</b></h5>' +
            '服务时间:周一至周六9:00-18:00'
        });
    });
});
