$(function() {
	var i, date1, date2, that, n, num, cha, str, createTime, n1, n2, dt, id, p0 = p1 = p2 = p3 = 1,
		y0, y1, y2, y3;
	var storage = window.sessionStorage;
	i = $(".mui-bar").children(".mui-active").index();
	console.log(i);
	published(); //已发布
	unread(); //未读新闻
	readed(); //已读新闻
	classify(); //新闻分类
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			if(i == 0) {
				if(p0 < y0 || p0 == y0) {
					p0++;
					published();
					if(p0 == y0) {
						$("#tabbar .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
			if(i == 1) {
				if(p1 < y1 || p1 == y1) {
					p1++;
					unread();
					if(p1 == y1) {
						$("#tabbar-with-chat .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
			if(i == 2) {
				if(p2 < y2 || p2 == y2) {
					p2++;
					readed();
					if(p2 == y2) {
						$("#tabbar-with-contact .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
			if(i == 3) {
				if(p3 < y3 || p3 == y3) {
					p3++;
					classify();

					if(p3 == y3) {
						$("#tabbar-with-map  .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
		};
	});

	//更换标题
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
		i = $(this).index();
		that = this.href;
		n = that.indexOf("tabbar");
		that = that.substr(0, n);
		that = that + "tabbar" + i + ".html";
		window.history.replaceState(null, null, that);
	});

	//底部未读消息位置
	window.onload = function() {
		var title = document.getElementById("title");
		var rt = $("#second").position().left;
		var rw = $("#second").outerWidth(true);
		$("#badge").css("left", rt - 0 + rw - 0 + 2 + "px");
	}
	//多余字数。。。
	$(".list li .text").each(function() {
		if($(this).text().length > 37) {
			var demoHtml = $(this).html().substr(0, 37) + '...';
			$(this).html(demoHtml);
		}
	});
	//查看新闻详情
	$(".news .list li").click(function() {
		storage.index = i; //判断是否是未读新闻
		storage.newsId = $(this).attr("id"); //哪一条新闻 根据id获取新闻详情
		mui.openWindow({
			url: 'details.html',
			id: 'details',
		});
	});
	//点击分类
	$(".news-map .list").on("click", "li", function() {
		storage.id = $(this).attr("id");
		mui.openWindow({
			url: 'classify.html',
			id: 'classify',
		});
	});

	//已发布的新闻	
	function published() {
		mui.ajax("http://192.168.1.116:8080/BS56/news/list?status=0&page=" + p0, {
			type: "post",
			dataType: 'json',
			success: function(data) {
				console.log(JSON.stringify(data));
				alert("s:"+JSON.stringify(data));
				if(data.total == 0) {
					str = '<p class="tswz">您还没有发布新闻</p>';
				} else {
					if((data.total - 0) / 10 == 0) {
						y0 = parseInt((data.total - 0) / 10);
					} else {
						y0 = parseInt((data.total - 0) / 10) + 1;
					}
					newsload($("#tabbar .list"), data, i);

					if(y0 == 1) {
						$("#tabbar .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}

			},
			error: function(res) {
				console.log(JSON.stringify(res));
				alert("f:"+JSON.stringify(res));
			}

		});
	}

	//未读的新闻	
	function unread() {
		mui.ajax("http://192.168.1.116:8080/BS56/news/userSeeStatus?status=1&page=" + p1, {
			type: "post",
			dataType: 'json',
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.total == 0) {
					str = '<p class="tswz">您还没有未读的新闻</p>';
					$("#tabbar-with-chat .list").html(str);
				} else {
					if((data.total - 0) / 10 == 0) {
						y1 = parseInt((data.total - 0) / 10);
					} else {
						y1 = parseInt((data.total - 0) / 10) + 1;
					}
					$("#badge").removeClass("mui-hidden");
					
					if(p1==1){
						if(data.total > 99) {
							$("#badge").html("99+");
						} else {
							$("#badge").html(data.total);
						}	
					}

					newsload($("#tabbar-with-chat .list"), data, i);

					if(y1 == 1) {
						$("#tabbar-with-chat .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}

			},
			error: function(res) {
				console.log(JSON.stringify(res));
			}

		});
	}

	//已读的新闻
	function readed() {
		mui.ajax("http://192.168.1.116:8080/BS56/news/userSeeStatus?status=0&userId=7016&page=" + p2, {
			type: "post",
			dataType: 'json',
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.total == 0) {
					str = '<p class="tswz">您还没有已读的新闻</p>';
					$("#tabbar-with-contact .list").html(str);
				} else {
					if((data.total - 0) / 10 == 0) {
						y2 = parseInt((data.total - 0) / 10);
					} else {
						y2 = parseInt((data.total - 0) / 10) + 1;
					}

					newsload($("#tabbar-with-contact .list"), data, i);

					if(y2 == 1) {
						$("#tabbar-with-contact .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			},
			error: function(res) {
				console.log(JSON.stringify(res));
			}
		});
	}

	//分类
	function classify() {
		mui.ajax("http://192.168.1.116:8080/BS56/news/newsShorList&page=" + p3, {
			type: "post",
			dataType: 'json',
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.total == 0) {
					str = '<p class="tswz">您还没有已读的新闻</p>';
					$("#tabbar-with-map .list").html(str);
				} else {
					for(let j = 0; j < data.rows.length; j++) {
						str = '<li class="mui-table-view-cell" id=' + data.rows[j].id + '>';
						str += '<a>' + data.rows[j].name + '</a>';
						str += '</li>';
						$("#tabbar-with-map .list").append(str);
					}
				}

			},
			error: function(res) {
				console.log(JSON.stringify(res));
			}

		});
	}

	function newsload(obj, cont, number) { //加载内容
		for(let j = 0; j < cont.rows.length; j++) {
			if(num == 1) {
				createTime = cont.rows[j].updateTime;
			} else {
				createTime = cont.rows[j].createTime;
			}

			whtime(createTime);
			str += '<li id=' + cont.rows[j].id + '>';
			str += '<p class="title bordersb mui-ellipsis">' + cont.rows[j].title + '</p>';
			str += '<p class="text">' + cont.rows[j].content + '</p>';
			str += '<p class="look"><a>查看详情</a></p>';
			str += '</li>';
			obj.append(str);
		}

	}

	function whtime(t) { //判断时间是否是今天跟昨天
		str = "";
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