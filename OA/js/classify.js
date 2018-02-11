$(function(){
	var cha,num,str,data1,data2,n1,n2,p=1,y;
	var storage = window.localStorage;
	classify();
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			if(p < y || p == y) {
				p++;
				classify();
				if(p == y) {
					$(".content .mui-pull-bottom-pocket").removeClass('mui-hidden');
				}
			}
		}
	});
		//分类的新闻		
		function classify(){
			mui.ajax("http://192.168.1.120:8082/BS56/news/list?status=0&type="+storage.type+"&page="+p, {
				type: "post",
				dataType: 'json',
				success: function(data) {
					console.log(JSON.stringify(data));
					if(data.total==0){
						$("section").html("<p style='height:100px;line-height:100px;text-align: center;'>还没有"+storage.html+"新闻</p>")
					}
					else{
						if(p==0){
							if((data.total - 0) / 10 == 0) {
								y = parseInt((data.total - 0) / 10);
							} else {
								y = parseInt((data.total - 0) / 10) + 1;
								if(y==1){
									$(".content .mui-pull-bottom-pocket").removeClass('mui-hidden');
								}
							}	
						}
						for (let j=0;j<data.rows.length;j++) {
							createTime=data.rows[j].createTime;
							console.log(createTime);
							whtime(createTime);
							str+='<li id='+data.rows[j].id+'>';
								str+='<p class="title bordersb mui-ellipsis">'+data.rows[j].title+'</p>';
								str+='<p class="text">'+data.rows[j].content+'</p>';
								str+='<p class="look"><a>查看详情</a></p>';
							str+='</li>';
							$(".list").append(str);
						}	
					}
				},
				error: function(res) {
					console.log(JSON.stringify(res));
				}
	
			});	
		}
		
		//多余字数。。。
		$(".list li .text").each(function () {
	        if($(this).text().length>37){
	          var demoHtml = $(this).html().substr(0,37)+'...';
	          $(this).html(demoHtml);
	        }
	    });
	    //查看新闻详情
	    $(".list").on("click","li",function(){
	    	storage.newsId=$(this).attr("id");
	      	mui.openWindow({
				url: 'details.html',
				id: 'details',
			});
	    });
		    
		 function whtime(t) { //判断时间是否是今天跟昨天
		str = "";
		date1 = new Date(t) //要对比的时间
		date2 = new Date(); //一天的毫秒数
		cha = date2.getTime() - date1.getTime(); //两个时间的毫秒差
		num = 24 * 60 * 60 * 1000; //获取当前时间对象
		n1 = t.replace(/-/g, "/").substr(0, t.length - 3);
		dt = t.split(" ")[1];
		n2 = dt.substr(0, dt.length - 3);
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
					str += '<span>昨天&nbsp;' + n2 + '</span>';
				} else {
					str += '<span>' + n1 + '</span>';
				}
			} else if(date1.getDate() != date2.getDate()) {
				if(date1.getDate() + 1 == date2.getDate()) {
					str += '<span>昨天&nbsp;' + n2 + '</span>';
				} else {
					str += '<span>' + n1 + '</span>';
				}
			} else {
				str += '<span>' + n2 + '</span>';
			}
			str += '</div>';
		}
	}
})
