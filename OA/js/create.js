$(function() {
	
	var storage = window.localStorage;
	var str = '',flag = true,flag2=false;
	var userName ={};
	console.log(storage.id);
	$("#head-title").html(storage.title);
	mui.post('http://192.168.1.120:8082/BS56/appform/' + storage.id + '.form', {},
		//			mui.post('http://192.168.1.120:8082/BS56/appform/145.form',{},
		function(data) {
			console.log(JSON.stringify(data));
			for(let i = 0; i < data.length; i++) {
				console.log(data[i].formNameDesc);
				if(data[i].formNameDesc != "") {
					if(data[i].dataType != 5) {
						if(data[i].dataType == 12) {
							str += '<div class="box box2 nbtbox">';
							str += '<div class="cont explain">';
							str += '<p class="text pad">' + data[i].formNameDesc + '</p>';
							str += '<textarea class="textp" title=' + data[i].name + ' placeholder="请输入' + data[i].formNameDesc + ',请填写少于50字" oninput="if(value.length>50)value=value.slice(0,50)"></textarea>';
							str += '</div>';
							str += '</div>';
						} else {
							str = '<div class="cont border">';
							str += '<span class="text">' + data[i].formNameDesc + '</span>';
							str += '<input title=' + data[i].name + ' class="textp money fl-right fl-input" type="text" oninput="if(value.length>10)value=value.slice(0,10)" placeholder="请输入' + data[i].formNameDesc + '"/>';
							str += '</div>';
						}

					} else {
						str = '<div class="cont btn border">';
						str += '<span class="text">' + data[i].formNameDesc + '</span>';
						str += '<span class="text fl-right userName" title=' + data[i].name + '></span>';
						str += '<span class="create-right"></span>';
						str += '</div>';
					}
					$("section").append(str);
				}
			}
			(function($) {
				$.init();
				var btns = $('section .btn');
				btns.each(function(i, btn) {
					btn.setAttribute('data-options', '{"beginYear":' + new Date().getFullYear() + '}');
					btn.addEventListener('tap', function() {
						var optionsJson = this.getAttribute('data-options') || '{}';
						var options = JSON.parse(optionsJson);
						var id = this.getAttribute('id');
						var picker = new $.DtPicker(options);
						picker.show(function(rs) {
							btn.getElementsByTagName("span")[1].innerHTML = rs.text;
							picker.dispose();
						})
					}, false);
				});
			})(mui);
		}, 'json'
	);

	//转交下一步
	$("#next").on("click", function() {
		userName = {};
		flag = true;
		$(".userName").each(function() {
			if($(this).html() == "") {
				mui.toast("请输入" + $(this).siblings(".text").html());
				flag = false;
				return false;
			} else {
				userName[$(this).attr("title")]=$(this).html();
			}
		});
		$(".textp").each(function() {
			if($(this).val() == "") {
				mui.toast("请输入" + $(this).siblings(".text").html());
				flag = false;
				return false;
			} else {
				userName[$(this).attr("title")]=$(this).val();
			}
		});
		console.log(JSON.stringify(userName));
		if(flag) {
			mui.ajax('http://192.168.1.120:8082/BS56/appform/apply/' + storage.id + '.form', {
				type: "post",
				dataType: 'json',
				data: {
					json:JSON.stringify(userName)
				},
				success: function(data) {
					console.log(JSON.stringify(data));
					mui.toast("发起成功");
					mui.back();
				},
				error: function(res) {
					console.log(JSON.stringify(res))
				}

			});
		}

	});
	
	$("body").on("focus","input",function(){
		flag2=true;
		timer=setInterval(function(){
			$("header").css("position","absolute");
	    	$("header").css("top",$(window).scrollTop());
	    },50);
	    touchm();
	});
	$("body").on("blur","input",function(){
		flag2=false;
		clearInterval(timer);
		$("header").css("position","fixed");
		$("header").css("top","0");
	});
	$("body").on("focus","textarea",function(){
		flag2=true;
		timer=setInterval(function(){
			$("header").css("position","absolute");
	    	$("header").css("top",$(window).scrollTop());
	    },50);
	    touchm();
	})
	$("body").on("blur","textarea",function(){
		flag2=false;
		clearInterval(timer);
		$("header").css("position","fixed");
		$("header").css("top","0");
	});
	
	function touchm(){
		//手指接触屏幕
	    document.addEventListener("touchstart", function(e) {
			if(flag2){
				$("body input").blur();
	        	$("body textarea").blur();
			}
	    }, false);	
	}
})