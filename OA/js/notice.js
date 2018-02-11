var page = 1,page2=1;
var ul=$('#tabbar-with-chat .list')[0],ul2=$('#tabbar-with-contact .list')[0];
//未读的公告
$.ajax("http://192.168.1.120:8082/BS56/notice/queryNoticePageList?status=1&userId=1820&page=" + page, {
	type: "post",
	dataType: 'json',
	success: function(data) {
		console.log(JSON.stringify(data));
		if(data.total == 0) {
			mui('#tabbar-with-chat .mui-pull-caption')[0].innerHTML = "您还没有未读的公告";
			$('#tabbar-with-chat .mui-pull-loading').addClass('mui-hidden');
			$("#badge").hide();
		} else {
			if(page==1){
				if(data.total > 99) {
					$("#badge").html("99+");
				} else {
					$("#badge").html(data.total);
				}	
			}
			$.each(data.rows, function(i,list) {
				time=list.createTime;
				timeText=getTimeText(time);
//				ul.html('<div class="release-time"><span>'+timeText+'</span></div>')
				div = document.createElement('div');
				div.className='release-time';
				div.innerHTML='<span>'+timeText+'</span>';
				li = document.createElement('li');
				li.innerHTML='<p class="title bordersb mui-ellipsis">'+list.noticeTitle+'</p><p class="text">'+list.noticeContent+'</p><span class="look">查看详情</span>';
				ul.appendChild(div);
				ul.appendChild(li);
				mui('.list li .look')[i].addEventListener('tap', function() {
			      	mui.openWindow({
						url: 'no_details.html',
						id: 'no_details'
					});
					localStorage.detail=list.id;
					localStorage.status=1;
			    });
			});
			if(data.total<10){
				mui('#tabbar-with-chat .mui-pull-caption')[0].innerHTML = "没有更多公告了";
				$('#tabbar-with-chat .mui-pull-loading').addClass('mui-hidden');
			}
		}
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
});
//已读的公告
$.ajax("http://192.168.1.120:8082/BS56/notice/queryNoticePageList?status=0&userId=1820&page=" + page2, {
	type: "post",
	dataType: 'json',
	success: function(data) {
		console.log(JSON.stringify(data));
		if(data.total == 0) {
			mui('#tabbar-with-contact .mui-pull-caption')[0].innerHTML = "尚未阅读公告";
			$('#tabbar-with-contact .mui-pull-loading').addClass('mui-hidden');
		} else {
			$.each(data.rows, function(i,list) {
				time=list.createTime;
				timeText=getTimeText(time);
//				ul.html('<div class="release-time"><span>'+timeText+'</span></div>')
				div = document.createElement('div');
				div.className='release-time';
				div.innerHTML='<span>'+timeText+'</span>';
				li = document.createElement('li');
				li.innerHTML='<p class="title bordersb mui-ellipsis">'+list.noticeTitle+'</p><p class="text">'+list.noticeContent+'</p><span class="look">查看详情</span>';
				ul2.appendChild(div);
				ul2.appendChild(li);
				mui('.list li .look')[i].addEventListener('tap', function() {
			      	mui.openWindow({
						url: 'no_details.html',
						id: 'no_details'
					});
					localStorage.detail=list.id;
					localStorage.status=0;
			    });
			});
			if(data.total<10){
				mui('#tabbar-with-contact .mui-pull-caption')[0].innerHTML = "没有更多公告了";
				$('#tabbar-with-contact .mui-pull-loading').addClass('mui-hidden');
			}
		}
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
});

//判断是否需要刷新
if(localStorage.load==1){
	localStorage.load=0;
	window.location.reload(); 
}
//

$(window).scroll(function() {
	var i=$(".mui-bar").children(".mui-active").index();
	if($(window).scrollTop() == $(document).height() - $(window).height()) {
		if(i==0){
			mui('#tabbar-with-chat .mui-pull-caption')[0].innerHTML = "加载中......";
			$('#tabbar-with-chat .mui-pull-loading').removeClass('mui-hidden');
			setTimeout(function() {
				page++;
				$.ajax("http://192.168.1.120:8082/BS56/notice/queryNoticePageList?status=1&userId=1820&page=" + page, {
					type: "post",
					dataType: 'json',
					success: function(data) {
						console.log(JSON.stringify(data));
							$.each(data.rows, function(i,list) {
								time=list.createTime;
								timeText=getTimeText(time);
				//				ul.html('<div class="release-time"><span>'+timeText+'</span></div>')
								div = document.createElement('div');
								div.className='release-time';
								div.innerHTML='<span>'+timeText+'</span>';
								li = document.createElement('li');
								li.innerHTML='<p class="title bordersb mui-ellipsis">'+list.noticeTitle+'</p><p class="text">'+list.noticeContent+'</p><span class="look">查看详情</span>';
								ul.appendChild(div);
								ul.appendChild(li);
								mui('.list li .look')[i].addEventListener('tap', function() {
							      	mui.openWindow({
										url: 'no_details.html',
										id: 'no_details'
									});
									localStorage.detail=list.id;
									localStorage.status=1;
							    });
							});
							if(data.total<10){
								mui('#tabbar-with-chat .mui-pull-caption')[0].innerHTML = "没有更多公告了";
								$('#tabbar-with-chat .mui-pull-loading').addClass('mui-hidden');
							}
					},
					error: function(res) {
						console.log(JSON.stringify(res));
					}
				});
			}, 1000)
		}
		if(i==1){
			mui('#tabbar-with-contact .mui-pull-caption')[0].innerHTML = "加载中......";
			$('#tabbar-with-contact .mui-pull-loading').removeClass('mui-hidden');
			setTimeout(function() {
				page2++;
				$.ajax("http://192.168.1.120:8082/BS56/notice/queryNoticePageList?status=0&userId=1820&page=" + page2, {
					type: "post",
					dataType: 'json',
					success: function(data) {
						console.log(JSON.stringify(data));
							$.each(data.rows, function(i,list) {
								time=list.createTime;
								timeText=getTimeText(time);
				//				ul.html('<div class="release-time"><span>'+timeText+'</span></div>')
								div = document.createElement('div');
								div.className='release-time';
								div.innerHTML='<span>'+timeText+'</span>';
								li = document.createElement('li');
								li.innerHTML='<p class="title bordersb mui-ellipsis">'+list.noticeTitle+'</p><p class="text">'+list.noticeContent+'</p><span class="look">查看详情</span>';
								ul2.appendChild(div);
								ul2.appendChild(li);
								mui('.list li .look')[i].addEventListener('tap', function() {
							      	mui.openWindow({
										url: 'no_details.html',
										id: 'no_details'
									});
									localStorage.detail=list.id;
									localStorage.status=0;
							    });
							});
							if(data.total<10){
								mui('#tabbar-with-contact .mui-pull-caption')[0].innerHTML = "没有更多公告了";
								$('#tabbar-with-contact .mui-pull-loading').addClass('mui-hidden');
							}
					},
					error: function(res) {
						console.log(JSON.stringify(res));
					}
				});
			}, 1000)
		}
	}
})
