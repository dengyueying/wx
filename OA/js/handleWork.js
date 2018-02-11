$(function(){
	var flag=false,y=0;
	var storage = window.localStorage;
	$("#agreeText").on("input",function(){
		$(this).val($(this).val().trim());
	});
	$("#check").on("click",function(){
		if($(this).hasClass("icon-checked")){
			$(this).removeClass("icon-checked");
			$(this).children("p").html("不同意");
			y=1;
		}
		else{
			$(this).addClass("icon-checked");
			$(this).children("p").html("同意");
			y=0
		}
	})
	//提交
	$("#next").on("click",function(){
		if($("#agreeText").val()!=""){
			mui.ajax('http://192.168.1.120:8082/BS56/appform/processDoc_approve', {
				type: "post",
				dataType: 'json',
				data: {
					pdocId:storage.pdocId,
					tsId: storage.tsId,
					pistId: storage.pistId,
					apvComment: $("#agreeText").val(),
					apvStatus: y,//0表示同意批复  1表示不同意批复
					transitionName:storage.tsName,
					formId:storage.formId,
					longId:storage.longId
				},
				success: function(data) {
					console.log(JSON.stringify(data));
					mui.openWindow({
						url: 'job-tabbar1.html',
						id: 'job-tabbar1',
					});
				},
				error: function(res) {
					console.log(JSON.stringify(res))
				}

			});
		}else{
			mui.toast("请填写您的意见");
		}
	})
	
	$("textarea").focus(function(){
		flag=true;
		timer=setInterval(function(){
			$("header").css("position","absolute");
	    	$("header").css("top",$(window).scrollTop());
	    },50);
	    touchm();
	}).blur(function(){
		flag=false;
		clearInterval(timer);
		$("header").css("position","fixed");
		$("header").css("top","0");
	});
    function touchm(){
		//手指接触屏幕
	    document.addEventListener("touchstart", function(e) {
			if(flag){
				$("body input").blur();
	        	$("body textarea").blur();
			}
	    }, false);	
	}
})
