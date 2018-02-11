$(function() {
	var n, obj, flag = true,str = "",footId;
	var storage = window.localStorage;
	
	//足迹列表
	$.ajax({
		url: 'http://192.168.1.156:9090/api/footprint/list',
		type: "post",
		dataType: 'json',
		headers: {
			'X-Nideshop-Token': storage.token
		},
		data:{
			page:1,
			size:10
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.errno == 0) {
				str='';
				var data=data.data.data[0];
				console.log(JSON.stringify(data[1]));
				for (let i=0;i<data.length;i++) {
					if(data.length==1){
						str='<li>';
							str+='<div class="time borderbot pad">';
								str+='<span>'+data[0].add_time+'</span>';
							str+='</div>';
							str+='<ol class="pad sublist">';
								str+='<li class="borderbot">';
									str+='<img src="img/pic1.png"/>';
									str+='<div class="info">';
										str+='<p class="title">'+data[0].name+'</p>';
										str+='<p class="text">'+data[0].goods_brief+'</p>';
										str+='<p class="money">￥'+data[0].retail_price+'</p>';
									str+='</div>';
								str+='</li>';
							str+='</ol>';
						str+='</li>';
					}
					else{
						if(i==0){
							str='<li>';
								str+='<div class="time borderbot pad">';
									str+='<span>'+data[0].add_time+'</span>';
								str+='</div>';
								str+='<ol class="pad sublist">';
									str+='<li class="borderbot" id='+data[0].id+'>';
										str+='<img src="img/pic1.png" />';
										str+='<div class="info">';
											str+='<p class="title">'+data[0].name+'</p>';
											str+='<p class="text">'+data[0].goods_brief+'</p>';
											str+='<p class="money">￥'+data[0].retail_price+'</p>';
										str+='</div>';
									str+='</li>';
						}
						else{
							if(data[i].add_time==data[i-1].add_time){
								str+='<li class="borderbot" id='+data[0].id+'>';
									str+='<img src="img/pic1.png"/>';
									str+='<div class="info">';
										str+='<p class="title">'+data[0].name+'</p>';
										str+='<p class="text">'+data[0].goods_brief+'</p>';
										str+='<p class="money">￥'+data[0].retail_price+'</p>';
									str+='</div>';
								str+='</li>';
							}
							else{
									str+='</ol>';
								str+='</li>';
								
								str+='<li>';
								str+='<div class="time borderbot pad">';
									str+='<span>'+data[0].add_time+'</span>';
								str+='</div>';
								str+='<ol class="pad sublist">';
									str+='<li class="borderbot" id='+data[0].id+'>';
										str+='<img src="img/pic1.png"/>';
										str+='<div class="info">';
											str+='<p class="title">'+data[0].name+'</p>';
											str+='<p class="text">'+data[0].goods_brief+'</p>';
											str+='<p class="money">￥'+data[0].retail_price+'</p>';
										str+='</div>';
									str+='</li>';
							}
							if(i==data.length-1){
								str+='</ol>';
								str+='</li>';
							}
						}
					}
				}
				$(".list").append(str);
//				console.log($(".list").html());
			} else {
				mui.toast(data.msg);
			}
		},
		error: function(res) {
			console.log(JSON.stringify(res))
		}
	});

	//编辑
	$(".edit").on("click", function(e) {
		if($(this).hasClass("ok")) {
			$(this).html("编辑足迹");
			$(this).removeClass("ok");
			$(".check").remove();
			$("footer").addClass("mui-hidden");
		} else {
			str = '<i class="check"></i>';
			$(this).html("完成");
			$(this).addClass("ok");
			$("footer").removeClass("mui-hidden");
			$(".time").prepend(str);
			$(".sublist li").prepend(str);
			$("footer .all").prepend(str);
			$(".active").removeClass("active");
			$(".btn").removeClass("btn");
		}
	});
	//点击时间选择
	$(".list").on("click", "li .time",function(e) {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(".all").removeClass("active");
			$(this).siblings().children().removeClass("active");
		} else {
			$(this).addClass("active");
			$(this).siblings().children().addClass("active");
			checkAll();
		}
		yncheck();
	});
	//点击商品选择
	$(".list").on("click", ".sublist li", function(e) {
		if($("body").find(".ok").length == 0) {
			mui.openWindow({
				url: 'details.html',
				id: 'details',
			});
		} else {
			flag = true;
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(".all").removeClass("active");
				$(this).parent().siblings().removeClass("active");
			} else {
				$(this).addClass("active");
				var obj = $(this).parent().children();
				var n = obj.length;
				obj.each(function() {
					if(!$(this).hasClass("active")) {
						flag = false;
						return false;
					}
				});
				if(flag) {
					$(this).parent().siblings().addClass("active");
					checkAll();
				}
			}
			yncheck();
		}

	});
	//全选反选
	$("footer").on("click", ".all", function(e) {
		if($(this).hasClass("active")) {
			$(this).removeClass("checked");
			$(".active").removeClass("active");
		} else {
			$(this).addClass("active");
			$(".list .time").addClass("active");
			$(".sublist li").addClass("active");
		}
		yncheck();
	});

	//删除足迹
	$("footer").on("click", ".btn", function() {
		$(".list .sublist li.active").each(function() {
			footId=$(this).attr('id');
			console.log(footId);
			deleteOrder(footId,$(this));
		});
		$(".list .time").each(function() {
			if($(this).hasClass("active")) {
				$(this).parent().remove();
			} 
		});
	});

	function checkAll() {
		flag = true;
		$(".list .time").each(function() {
			if(!$(this).hasClass("active")) {
				flag = false;
				return false;
			}
		});
		if(flag) {
			$(".all").addClass("active");
		}
	};

	function yncheck() {
		if($(".active").length != 0) {
			$(".delete").addClass("btn");
		} else {
			$(".delete").removeClass("btn");
		}
	}
	
	function deleteOrder(fid,obj){  //删除足迹
		mui.ajax('http://192.168.1.156:9090/api/footprint/delete', {
			type: "post",
			dataType: 'json',
			data:{
				id:fid
			},
			headers: {
              'X-Nideshop-Token':storage.token
          	},
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.errno==0){
					obj.remove();
					mui.toast("删除成功");	
				}
				else{
					mui.toast(data.errmsg);
				}
			},
			error: function(res) {
				console.log(JSON.stringify(res))
			}
		});
	}
})