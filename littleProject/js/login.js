$(function(){
	var storage = window.localStorage;
	$.ajax({
			url:'http://192.168.1.156:9090/api/auth/login',
			type: "post",
			dataType: 'json',
			data:{
				'mobile':13838383388,
				'password':123456,
			},
			success: function(data) {
				console.log(JSON.stringify(data));
				storage.token=data.token;
			},
			error: function(res) {
				console.log(JSON.stringify(res))
			}
		});
})
