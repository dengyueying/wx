$.ajax({
	type:"post",
	url:"http://192.168.1.120:8082/BS56/notice/queryNoticePageList",
	dataType:'json',
	success: function(data) {
		console.log(JSON.stringify(data));
		$('.mqe marquee').text(data.rows[0].noticeTitle);
		localStorage.detail=data.rows[0].id;
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
});