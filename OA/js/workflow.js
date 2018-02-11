$(function() {
	
	var str, hour,typeText;
	var storage = window.localStorage;
	if(storage.processStatus==1){
		typeText="yb";
	}
	else if(storage.processStatus==2){
		typeText="ywc";
	}
	else{
		typeText="wd";
	}
	mui.ajax('http://192.168.1.120:8082/BS56/appform/queryWork', {
		type: "post",
		dataType: 'json',
		data:{
			type:typeText,
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data==""){
				console.log(storage.processStatus);
				if(storage.processStatus==1){
					$(".list").html("<p style='height:100px;line-height:100px;text-align: center;'>您还没有已办结的工作</p>");
				}
				else if(storage.processStatus==2){
					$(".list").html("<p style='height:100px;line-height:100px;text-align: center;'>您还没有已完成的工作</p>");
				}
				else{
					$(".list").html("<p style='height:100px;line-height:100px;text-align: center;'>您还没有发布工作</p>");
				}
			}else{
				for(let i =data.length-1; i >=0; i--) {
					whtime(data[i].startTime);
					str = '<div class="release-time">';
					str += '<span>' + hour + '</span>';
					str += '</div>';
					str += '<li id=' + data[i].formId + '>';
					str += '<p class="title bordersb" id=' + data[i].longId + '>' + data[i].title + '</p>';
					str += '<div class="text">';
					str += '<p>';
					str += '<span>申请人:</span>';
					str += '<span class="answer">'+data[i].FD_USERNAME+'</span>';
					str += '</p>';
					str += '<p>';
					str += '<span class="name">部门:</span>';
					str += '<span  class="answer">'+data[i].FD_DEPTNAME+'</span>';
					str += '</p>';
					str += '</div>';
					if(data[i].apvStatus==0){
						str += '<span class="look">已同意</span>';
					}
					else{
						str += '<span class="look wait">已驳回</span>';
					}
					str += '</li>';
					$(".list").append(str);	
					
				}	
			}
			
		},
		error: function(res) {
			console.log(JSON.stringify(res));
		}
	});	

	//查看工作详情
	$(".list").on("click", "li", function() {
		storage.formId = $(this).attr("id");
		storage.longId = $(this).children(".title").attr("id");
		mui.openWindow({
			url: 'overWorkDetails2.html',
			id: 'overWorkDetails2',
		});
	});

	function whtime(t) { //判断时间是否是今天跟昨天
		date1 = new Date(t) //要对比的时间
		date2 = new Date(); //一天的毫秒数
		cha = date2.getTime() - date1.getTime(); //两个时间的毫秒差
		num = 24 * 60 * 60 * 1000; //获取当前时间对象
		n1 = t.replace(/-/g, "/").substr(0, t.length - 3);
		dt = t.split(" ")[1];
		n2 = dt.substr(0, dt.length - 3);
		//		console.log("n1:" + n1);
		//		console.log("n2:" + n2);
		n3 = n2.substring(0, 2);
		if(12 - n3 > 0) {
			n2 = "上午&nbsp;" + n2.substr(1, dt.length);
		} else {
			n2 = "下午&nbsp;" + n2
		}
		if(cha > 0) {
			str = '<div class="release-time">';
			if(cha > num) {
				if(date1.getDate() + 1 == date2.getDate()) {
					hour = '昨天&nbsp;' + n2 + '';
				} else {
					hour = n1;
				}
			} else if(date1.getDate() != date2.getDate()) {
				if(date1.getDate() + 1 == date2.getDate()) {
					hour = '昨天&nbsp;' + n2 + '';
				} else {
					hour = n1;
				}
			} else {
				hour = n2;
			}
		}
	}
})