/**
 * Created by chang on 2017/9/1.
 */
var dllength=$('.myprolist dd').length;
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
            myList+='<a href="javascript:;" class="fzname" data-id="'+result.content[i].id+'">&nbsp;&nbsp;'+result.content[i].tname+
                '</a>'
            //console.log(result.content[i].tname)
        }
        //console.log(myList);
        $('.myprolist').prepend(myList);
        $('.myprolist').on('click','a',function(){
            //alert(this.innerHTML)\
            $(this).addClass('red').siblings().removeClass('red');
            $('.zmtitle').html(this.innerHTML);
            var teamid=$(this).attr('data-id');
            //console.log(teamid);
            table.render({
                elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
                ,height:300 //容器高度
                ,width:1000
                ,page:true
                ,id:'test'
                ,cols:  [[ //标题栏
                    {field: 'name', title: '班组名称', width:200,templet: '#bzname'}
                    ,{field: 'mobile', title: '承包人', width:200,templet: '#userBar'}
                    ,{field: 'username', title: '班组长', width:200,templet:'#tablebar'}
                    ,{field: 'memberCount', title: '工人数', width:200,templet:'#numparse'}
                    ,{fixed: 'right', width:200, align:'center',title: '操作', toolbar: '#barDemo'}
                ]]//设置表头
                ,url:"/project/list/"+teamid+".html"
                ,done: function(res, curr, count){
                    //如果是异步请求数据方式，res即为你接口返回的信息。
                    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                    console.log(res);
//                                    $(document).on('click','tr',function(){
//
//                                    })
                }
            });
//                        }});
            //监听工具条
            table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                var datas = obj.data //获得当前行数据
                    ,layEvent = obj.event; //获得 lay-event 对应的值

                if(layEvent === 'add'){
                    //layer.msg('查看操作');
                    layer.open({
                        type:1
                        ,title: '转移到分组'
                        ,shade:false
                        ,closeBtn:1
                        ,area: ['300px','200px']
                        ,content:$('.myprolist')
                        ,btn:[]
                    });
                    $('.myprolist').on('click','.fzname',function(){
                        var teamid=$(this).attr('data-id');
                        console.log(datas.id);
                        ajaxData("project/move.html","relationId="+datas.id+"&teamId="+teamid,function(data){
                            console.log(data);
                            if(data.code==0){
                                alert('转移成功');
                                datas.id=null;
                            }else if(data.code==-2){
                                alert(data.message);
                            }
                        });
                        layer.closeAll();
                    })
                } else if(layEvent === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del(); //删除对应行（tr）的DOM结构
                        layer.close(index);
                        ajaxData("project/delete.html","relationId="+data.id,function(data){
                            console.log(data);
                            if(data.code==0){
                                alert('删除成功')
                            }else if(data.code==-2){
                                alert(data.message);
                            }
                        });
                    });
                }else if(layEvent === 'abc'){
                    console.log(datas);

                    $('.identifybody').html('<div class="prodetail">' +
                        '<p class="prodetailtitle">' +
                        '<span>' + datas.name+
                        '</span>' +
                        '</p>' +
                        '<div class="prodetailcont">' +
                        '<p>班组成员</p>' +
                        '<p>&nbsp;&nbsp;承包人:' +
                        '<span>'+datas.owner.mobile+
                        '</span>' +
                        '</p>' +
                        '<p>&nbsp;&nbsp;班组长:' +
                        '<span>' +datas.owner.username+
                        '</span>' +
                        '</p>' +
                        '<p>&nbsp;&nbsp;成员(' +
                        '<span>'+datas.memberCount+
                        '</span>):' +
                        '<span>' +datas.member.join('、')+
                        '</span>' +
                        '</p>' +
                        '</div>' +
                        '</div>');
                }
            });
        })

    }});



    $('.cjbefore').click(function(){
        layer.open({
            title: '创建分组'
            ,area: '150px'
            ,btn:['确认']
            ,content:'<input type="text" name="xzm"/>'
            ,success:function(layero){
                var btn = layero.find('.layui-layer-btn');
                btn.find('.layui-layer-btn0').click(function(){
                    //alert(1);
                    var xzm=$("input[name='xzm']").val();
                    console.log(xzm);
                    if(xzm==''){
                        alert('分组名不可为空')
                    }else{
                        $('.cjbefore').before('<dd><a href="javascript:;" class="xzm"></a></dd>');
                        $('.xzm').html(xzm);
                        ajaxData("project/team/add.html","tname="+xzm,function(data){
                            console.log(data);
                            location.reload();
                        });
                    }
                })

            }
        });
    })
    $(document).on("click","#lxdh",function(){
        layer.open({
            title: '联系电话'
            ,area: '150px'
            ,content:'<h5><b>免费热线:4000-518-571</b></h5>' +
            '服务时间:周一至周六9:00-18:00'
        });
    });
});
