/**
 * Created by chang on 2017/9/1.
 */
$(function(){

layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element'], function(){
    var laydate = layui.laydate //日期
        ,laypage = layui.laypage //分页
        ,layer = layui.layer //弹层
        ,table = layui.table //表格
        ,carousel = layui.carousel //轮播
        ,upload = layui.upload //上传
        ,element = layui.element; //元素操作
    $.ajax({url:"/project/team.html",data:"page=1&limit=30",type:"GET",dataType:"json",success:function(result){
        $('.mypronum').html(result.content.length);
        var myList='';
        var myListson='';
        for(var i=0;i<result.content.length;i++){
            myList+='<a href="javascript:;" class="fzname" data-id="'+result.content[i].id+'">'+result.content[i].tname+ '</a>'
            //console.log(result.content[i].tname)
        }
        //console.log(myList);
        $('.myprolist').prepend(myList);
        $('.myprolist').on('click','a',function(){
            //alert(this.innerHTML)\
            $(this).addClass('red').siblings().removeClass('red');
            $('.zmtitle').html(this.innerHTML);
            var teamid=$(this).attr('data-id');
            console.log(teamid);
            table.render({
                elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
                ,height:300 //容器高度
                ,width:1000
                ,page:true
                ,limit:10
                ,id:'test'
                ,cols:  [[ //标题栏
                    {field: 'name', title: '班组名称', width:200}
                    ,{field: 'name', title: '承包人', width:200}
                    ,{field: 'name', title: '班组长', width:200}
                    ,{field: 'name', title: '工人数', width:200}
                    ,{fixed: 'right', width:200, align:'center',title: '操作', toolbar: '#barDemo'}
                ]]//设置表头
                ,url:"/project/list/"+teamid+".html"
            });
        })

    }});
    table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        ,height:300 //容器高度
        ,width:1000
        ,page:true
        ,limit:10
        ,id:'test'
        ,cols:  [[ //标题栏
            {field: 'sname', title: '姓名单位名称', width:500}
            ,{fixed: 'right', width:495, align:'center',title: '权限设置', toolbar: '#barDemo'}
        ]]//设置表头
        ,url: '/project/director/list.html'

    });
    $.ajax({url:"/project/team/list.html",type:"GET",dataType:"json",success:function(result){
        console.log(result);
        var str='';
        if(result.code==0){
            for(var i=0;i<result.content.length;i++){
                var projects = result.content[i].project;
                if(projects.length>0){
                    str+='<p>'+'<input type="checkbox"/>'+'<span class="listfa">'+result.content[i].tname+'</span>'+'</p>';
                    var strson='';
                    for(var j=0;j<projects.length;j++){
                        strson+='<p>'+'<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>'+'<input type="checkbox" name="tests"/>'+'<span style="display: none">'+projects[j].id+'</span>'+'<span class="listso" dataId="'+projects[j].id+'">'+projects[j].name+'</span>'+'</p>';
                    }
                    str+=strson;
                }
            }
            $('#pj').html(str);
        }else{
            alert('获取项目失败');
        }

    }});
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        console.log(data);
        var strs='';
        var supervisionId = data.id;
        var subjectRelationIds=[];
        if(layEvent === 'add'){
            //console.log(data);
            layer.open({
                type:1 //此处以iframe举例
                ,title: data.sname+'权限设置'
                ,area: ['385px', '308px']
                ,shade: 0
                ,maxmin:false
                ,closeBtn: 0
                ,content:$('#pj')
                ,btn: ['确认', '取消'] //只是为了演示
                ,btn2: function(){
                    layer.closeAll();
                }
                ,btn1: function(){
                    $("input:checkbox[name='tests']:checked").each(function(){
                        subjectRelationIds.push($(this).next().text());
                    })
//                                subjectRelationIds.push(strs);
                    console.log(subjectRelationIds);
//                                console.log(typeof (strs));
//                                console.log(strs);
                    ajaxData("project/director/add.html","supervisionId="+supervisionId+"&subjectRelationIds="+subjectRelationIds,function(data){
                        console.log(data);
                        if(data.code==0){
                            alert('授权成功')
                        }else if(data.code==-2){
                            alert(data.message);
                        }
                    });
                    layer.closeAll();
                }

                ,zIndex: layer.zIndex //重点1
                ,success: function(layero){
                    layer.setTop(layero); //重点2
                }
            });


        }
    });
    $(document).on("click","#lxdh",function(){
        layer.open({
            title: '联系电话'
            ,area: ['300px','200px']
            ,content:'<h5><b>免费热线:4000-518-571</b></h5>' +
            '服务时间:周一至周六9:00-18:00'
        });
    });


});

})