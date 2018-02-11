var ul=mui('.mui-table-view')[0];
var storage = window.localStorage;
$.ajax({
	type:"post",
	url:"http://192.168.1.120:8082/BS56/appform/queryNotify?initiatorId="+1,
	dataType:'json',
	success: function(data) {
		console.log(JSON.stringify(data));
		$.each(data.list,function(i,list){
			time=list.createTime;
			timeText=getTimeText(time);
			if(timeText.indexOf('昨天')!=-1){
				timeText='昨天';
			}
			li = document.createElement('li');
			li.className='mui-table-view-cell';
			
			if(list.notifyStatus==1){
				li.innerHTML='<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>'+
				'<div class="mui-slider-handle mui-table"><div class="mui-table-cell mui-navigate-right"><p class="badge2" id="badge"></p><img src="img/banner.png" class="fl_lt" /><span>'+list.notifyTitle+'</span><div>'+timeText+'</div></div></div>';
			}else{
				li.innerHTML='<div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div>'+
				'<div class="mui-slider-handle mui-table"><div class="mui-table-cell mui-navigate-right"><img src="img/banner.png" class="fl_lt" /><span>'+list.notifyTitle+'</span><div>'+timeText+'</div></div></div>';
			}
			ul.appendChild(li);
			mui('.mui-btn.mui-btn-red')[i].addEventListener('tap', function() {
				$.ajax('http://192.168.1.120:8082/BS56/appform/deleteNotify?id='+list.id,{
					type:'post',
					dataType:'json',
					success: function(data) {
						if(data==1){
							var li = this.parentNode.parentNode;
							li.parentNode.removeChild(li);
						}else{
							mui.toast('删除失败');
						}
					}
				})
			})
			li.addEventListener('tap', function() {
				$.ajax('http://192.168.1.120:8082/BS56/appform/updateNotify?id='+list.id,{
					type:'post',
					dataType:'json',
					success: function(data) {
//						window.location.reload(); 
						console.log(list.formId+'**'+list.longId);
						storage.longId=list.longId;
						storage.formId=list.formId;
						mui.openWindow({
							url: 'waitWorkDetails.html',
							id: 'waitWorkDetails',
						});
					}
				})
			})
		})
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
});