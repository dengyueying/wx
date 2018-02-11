$(function(){
	var str,id,n1,n2,title=[],y=0;
		var storage = window.localStorage;
		//待办工作条数位置
		var title = document.getElementById("title");
		var rt=$("#second").position().left;
		var rw=$("#second").outerWidth(true);
		$("#badge").css("left",rt-0+rw-0+2+"px");
		//发起工作列表
		mui.post('http://192.168.1.120:8082/BS56/appform/list',{},
			function(data){
				console.log(JSON.stringify(data));
				for (let i=0;i<data.length;i++) {
					id=data[i].url;
					n1=id .lastIndexOf("\/"); 
					n2=id .lastIndexOf("."); 
					id=id.substring(n1+1,n2);
					console.log(id);
					str='<li id='+id+' class="mtime">';
						str+='<img src="img/work1.png"/>';
						str+='<p class="mui-ellipsis">'+data[i].menuname+'</p>';
					str+='</li>';
					$("#tabbar .list").append(str);
					title[i]=data[i].menuname;
				}
			},'json'
		);
		//待办工作列表
//		http://192.168.1.120:8082
		mui.ajax('http://192.168.1.120:8082/BS56/appform/queryWork', {
			type: "post",
			dataType: 'json',
			data:{
				type:"db",
//				userid:
//				processStatus:1,
//				apvStatus:0
			},
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data==""){
					$("#tabbar-with-chat .list").html("<p style='height:100px;line-height:100px;text-align:center;'>您还没有待办工作</p>");
				}
				else{
					for (let i=data.length-1;i>=0;i--) {
						y++;
						var startTime=data[i].startTime.split(" ")[0];
						str='<li class="bordersb pad mui-table-view-cell" pdocId='+data[i].processDocId+' tsId='+data[i].tsId+' pistId='+data[i].processInstanceId+' tsName='+data[i].tsName+' formId='+data[i].formId+' longId='+data[i].longId+'>';
						str+='<p class="classify"><span>'+data[i].title+'</span><span class="time2">'+startTime+'</span></p>';
//						str+='<p class="details"><span>'+data[i].FD_USERNAME+'('+data[i].FD_POSITION+')</span></p>';
						str+='</li>';
						$("#tabbar-with-chat .list").append(str);
					}
					$("#badge").removeClass("mui-hidden");
					$("#badge").html(y);
				}
			},
			error: function(res) {
				console.log(JSON.stringify(res))
			}
		});
			//更换标题
			mui('.mui-bar-tab').on('tap', 'a', function(e) {
				title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
				var i=$(this).index();
				var that=this.href;
				var n=that.indexOf("tabbar");
				that=that.substr(0,n);
				that=that+"tabbar"+i+".html";
				window.history.replaceState(null, null, that);
			});
			 
			  //点击发起工作列表
			  $("#tabbar .list").on("click","li",function(){
				  	storage.id=$(this).attr("id");
				  	storage.title=title[$(this).index()];
				  	console.log(storage.id);
				  	mui.openWindow({
						url: 'createTime.html',
						id: 'createTime',
					});
			  })
		      //待办工作详情
		       $(".job-chat .list").on("click","li",function(){
		       	storage.pdocId=$(this).attr("pdocId");
		       	storage.tsId=$(this).attr("tsId");
		       	storage.pistId=$(this).attr("pistId");
		       	storage.tsName=$(this).attr("tsName");
		       	storage.longId=$(this).attr("longId");
		       	storage.formId=$(this).attr("formId");
		       	mui.openWindow({
					url: 'waitWorkDetails.html',
					id: 'waitWorkDetails',
				});
		      });
		      //工作流
		      $("#tabbar-with-contact .list li").click(function(){
		      	storage.processStatus=$(this).index()-0+1;
				mui.openWindow({
					url: 'workflow.html',
					id: 'workflow',
				});
			});
})
