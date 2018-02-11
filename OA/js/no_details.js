$.ajax('http://192.168.1.120:8082/BS56/notice/queryNoticePageList?status='+localStorage.status+'&userId=1820&id='+localStorage.detail, {
	type: "post",
	dataType: 'json',
	success: function(data) {
		console.log(JSON.stringify(data));
		var list=data.rows[0];
		time=list.createTime;
		timeText=getTimeText(time);
		var html='<p class="title">'+list.noticeTitle+'</p><p class="text">'+list.noticeContent+'</p><div class="tost">'+
				'<p class="time">'+timeText+'</p><p class="release">'+list.createBy+'</p></div>';
		$('.content').html(html);
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
});


$.ajax('http://192.168.1.120:8082/BS56/notice/updateStatus?status=0&userId=1820&noticeId='+localStorage.detail,{
	type: "post",
	dataType: 'json',
	success: function(data) {
		console.log(JSON.stringify(data));
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
})

$('.mui-action-back').click(function(){
	localStorage.load=1;
	window.history.back();
})
