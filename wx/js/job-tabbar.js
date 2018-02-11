$(function(){
	var str,id,n1,n2,title=[];
		var storage = window.localStorage;
		var title = document.getElementById("title");
		var rt=$("#second").position().left;
		var rw=$("#second").outerWidth(true);
		$("#badge").css("left",rt-0+rw-0+2+"px");
		alert(1);
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
						str+='<p>'+data[i].menuname+'</p>';
					str+='</li>';
					$("#tabbar .list").append(str);
					title[i]=data[i].menuname;
				}
			},'json'
		);
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
//			  //时间类
//		      $("#tabbar").click(".mtime",function(){
//					mui.openWindow({
//						url: 'createTime.html',
//						id: 'createTime',
//					});
//				});
//				//资金类
//				$("#total").click(function(){
//					mui.openWindow({
//						url: 'create.html',
//						id: 'create',
//					});
//				});
		      
		      //待办工作详情
		       $(".job-chat .list li").click(function(){
		      	mui.openWindow({
							url: 'waitWorkDetails.html',
							id: 'waitWorkDetails',
						});
		      });
		      //工作流
		      $("#tabbar-with-contact .list li").click(function(){
				mui.openWindow({
					url: 'workflow.html',
					id: 'workflow',
				});
			});
})
