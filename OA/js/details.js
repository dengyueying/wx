$(function(){
			var i,newsId,str='';
			var storage = window.localStorage;
			newsId=storage.newsId; //新闻id
			i=storage.index;
			//根据新闻id获取新闻详情
			mui.ajax("http://192.168.1.120:8082/BS56/news/list?status=0&type="+storage.type+"&id=" + storage.newsId, {
				type: "post",
				dataType: 'json',
				success: function(data) {
					console.log(JSON.stringify(data));
					if(i == 1) {  //判断是未读新闻
						//未读新闻提交变已读
						mui.ajax("http://192.168.1.116:8080/BS56/news/updateUserSeeStatus?userId=7016&status=0&newId=" + storage.newsId, {
							type: "post",
							dataType: 'json',
							success: function(data) {
								console.log(JSON.stringify(data));
							},
							error: function(res) {
								console.log(JSON.stringify(res));
							}
			
						});
					}
					var row=data.rows[0];
					$("#title").html(row.title);
					$("#contText").html(row.content);
					whtime(row.createTime);
					$("#fbtime").html(str);
					$("#release").html(row.createBy+"发布");
				},
				error: function(res) {
					console.log(JSON.stringify(res));
				}

			});
			
			function whtime(t) { //判断时间是否是今天跟昨天
				str = "";
				date1 = new Date(t) //要对比的时间
				date2 = new Date(); //一天的毫秒数
				cha = date2.getTime() - date1.getTime(); //两个时间的毫秒差
				num = 24 * 60 * 60 * 1000; //获取当前时间对象
				console.log("cha:" + cha);
				console.log("num:" + num);
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
					if(cha > num) {
						if(date1.getDate() + 1 == date2.getDate()) {
							str = '昨天&nbsp;' + n2 + '';
						} else {
							str = n1;
						}
					} else if(date1.getDate() != date2.getDate()) {
						if(date1.getDate() + 1 == date2.getDate()) {
							str = '昨天&nbsp;' + n2 + '';
						} else {
							str =n1;
						}
					} else {
						str =n2;
					}
				}
			}
})
