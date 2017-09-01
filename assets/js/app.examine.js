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
    $.ajax({url:"/project/team.html",data:"page=1&limit=30",type:"GET",dataType:"json",success:function(result){
        //console.log(result);
        $('.mypronum').html(result.content.length);
        var myList='';
        for(var i=0;i<result.content.length;i++){
            myList+='<dd>' +
                '<a class="fzname" data-id="'+result.content[i].id+'">'+result.content[i].tname+
                '</a>'+
                '</dd>'
        }
        $('.myprolist').prepend(myList);

    }});
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'add'){
            //console.log(data);
            layer.open({
                title: '添加到分组'
                ,shade:false
                ,area: ['150px','300px']
                ,content:$('.myprolist')
                ,closeBtn: 0
                ,btn:[]
            });
            $('.myprolist').on('click','.fzname',function(){
                var teamid=$(this).attr('data-id');
                //console.log(data.id);
                ajaxData("project/move.html","relationId="+data.id+"&teamId="+teamid,function(data){
                    console.log(data);
                    if(data.code==0){
                        alert('成功')
                    }else if(data.code==-2){
                        alert(data.message);
                    }
                });
                layer.closeAll();
            })
        } else if(layEvent === 'del'){
            //console.log(data);
            layer.confirm('真的删除行么', function(index){
                //console.log(data);
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //console.log(data.owner.id);
                //向服务端发送删除指令
                ajaxData("project/delete.html","relationId="+data.id,function(data){
                    console.log(data);
                    if(data.code==0){
                        alert('删除成功')
                    }else if(data.code==-2){
                        alert(data.message);
                    }
                });
            });
        }
    });

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
        ,url: '/project/examine/list.html'
//                    ,done: function(res, curr, count){
//                        //如果是异步请求数据方式，res即为你接口返回的信息。
//                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
    });

    $(document).on("click","#lxdh",function(){
        layer.open({
            title: '联系电话'
            ,area: '150px'
            ,content:'<h5><b>免费热线:4000-518-571</b></h5>' +
            '服务时间:周一至周六9:00-18:00'
        });
    });
});