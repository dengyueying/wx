$.ajax({
	type:"post",
	url:"http://192.168.1.120:8082/BS56/appform/queryNotify?initiatorId="+1,
	dataType:'json',
	success: function(data) {
		console.log(JSON.stringify(data));
//		console.log(data.unread)
		if(data.unread==0){
			$('.badge').hide();
		}else if(data.unread>99){
			$('.badge').html('99+');
		}else{
			$('.badge').html(data.unread);
		}
	},
	error: function(res) {
		console.log(JSON.stringify(res));
	}
});