$(function(){
	var storage = window.localStorage;
	var str,p0=p1=p2=p3=p4=1,y0,y1,y2,y3,y4,index=0,status=-1,n;
	//删除订单
	$(".delete").on("click",function(){
		var that=$(this);
		var btnArray = ['取消', '删除'];
		mui.confirm(' ', '要删除该订单？', btnArray, function(e) {
			if (e.index == 1) {
				that.parent().parent().remove();
			} 
		}, 'div');
	});
	//订单类型
	$("#segmentedControl a").on("tap",function(e){
		n=index-0+1;
		index=$(this).index();
		$("item"+n+"").siblings().children(".pic-list").html("");
		
		if(index==0){  //全部
			status==-1
		}else if(index==1){//待付款
			console.log(1);
			status==0;
			if($("#item2 .pic-list").html()==""){
				getData();
			}
		}else if(index==2){//待发货
			status==201;
			if($("#item3 .pic-list").html()==""){
				getData();
			}
		}else if(index==3){//已发货
			status==300;
			if($("#item4 .pic-list").html()==""){
				getData();
			}
		}else{//待评价（确认收货）
			status==301;
			if($("#item5 .pic-list").html()==""){
				getData();
			}
		}
	});
	
	getData();
	
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			if(index == 0) {
				if(p0 < y0 || p0 == y0) {
					p0++;
					getData();
					if(p0 == y0) {
						$("#item1 .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
			if(index == 1) {
				if(p1 < y1 || p1 == y1) {
					p1++;
					getData();
					if(p1 == y1) {
						$("#item2 .mui-pull-bottom-pockett").removeClass('mui-hidden');
					}
				}
			}
			if(index == 2) {
				if(p2 < y2 || p2 == y2) {
					p2++;
					getData();
					if(p2 == y2) {
						$("#item3 .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
			if(index == 3) {
				if(p3 < y3 || p3 == y3) {
					p3++;
					getData();
					if(p3 == y3) {
						$("#item4  .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
			if(index == 4) {
				if(p4 < y4 || p4 == y4) {
					p4++;
					getData();
					if(p4 == y4) {
						$("#item5  .mui-pull-bottom-pocket").removeClass('mui-hidden');
					}
				}
			}
		};
	});

	
	//获取数据
	function getData(){
		$.ajax({
			url:'http://192.168.1.156:9090/api/order/list',
			type: "post",
			dataType: 'json',
			headers: {
	              'X-Nideshop-Token':storage.token
	          	},
			data:{
				page:p1,
				size:6,
				order_status:status
			},
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.errno==0){
					if(data==""){
						
					}
					else{
						if(index==0){
							if(parseInt(data.data.count)%10==0){
								y0=parseInt(data.data.count/10)
							}else{
								y0=parseInt(data.data.count/10)+1
							}
							if(y0==1){
								$("#item1  .mui-pull-bottom-pocket").removeClass('mui-hidden');
							}
						}
						if(index==1){
							if(parseInt(data.data.count)%10==0){
								y1=parseInt(data.data.count/10)
							}else{
								y1=parseInt(data.data.count/10)+1
							}
							if(y1==1){
								$("#item2  .mui-pull-bottom-pocket").removeClass('mui-hidden');
							}
						}
						if(index==2){
							if(parseInt(data.data.count)%10==0){
								y2=parseInt(data.data.count/10)
							}else{
								y2=parseInt(data.data.count/10)+1
							}
							if(y2==1){
								$("#item3  .mui-pull-bottom-pocket").removeClass('mui-hidden');
							}
						}
						if(index==3){
							if(parseInt(data.data.count)%10==0){
								y3=parseInt(data.data.count/10)
							}else{
								y3=parseInt(data.data.count/10)+1
							}
							if(y3==1){
								$("#item4  .mui-pull-bottom-pocket").removeClass('mui-hidden');
							}
						}
						if(index==4){
							if(parseInt(data.data.count)%10==0){
								y4=parseInt(data.data.count/10)
							}else{
								y4=parseInt(data.data.count/10)+1
							}
							if(y4==1){
								$("#item5  .mui-pull-bottom-pocket").removeClass('mui-hidden');
							}
						}
						for (let i=0;i<data.data.data.length;i++) {
							str='<li class="pad" id='+data.data.data[i].id+'>';
								str+='<div class="order borderbot">';
									str+='<span>订单号:</span><span class="number">'+data.data.data[i].order_sn+'</span>';
									if(data.data.data[i].shipping_status==0){//0未付款
										str+='<span class="cancel">取消订单</span>';
									}
									else{
										str+='<i class="delete"></i>';
									}
								str+='</div>';
								str+='<div class="pic">';
									str+='<img src="img/smallpic1.png" />';
									str+='<img src="img/smallpic2.png" />';
									str+='<img src="img/smallpic2.png" />';
								str+='</div>';
								str+='<div class="info borderbot">';
									str+='<p>共<span>3</span>件商品&nbsp;&nbsp;合计<span class="money">￥'+data.data.data[i].order_price+'</span><span>&nbsp;&nbsp;(含运费)</span></p>';
								str+='</div>';
								if(data.data.data[i].order_status!=101&&data.data.data[i].order_status!=102){//取消和删除
									str+='<div class="bottom">';
									if(data.data.data[i].order_status==0){//0订单创建成功等待付款
										str+='<span class="active overplus" data-seconds='+data.data.data[i].order_price+'>付款:'+data.data.data[i].order_price+'</span>';
									}
									else if(data.data.data[i].order_status==201){//订单已付款，等待发货
										str+='<span class="active">待发货</span>';
									}
									else if(data.data.data[i].order_status==300){//订单已发货
										str+='<span class="active">已发货</span>';
									}
									else if(data.data.data[i].order_status==301){//确认收货
										str+='<span class="active">待评价</span>';
									}
									str+='</div>';	
								}
							str+='</li>';	
							n=parseInt(index)+1;
							$("#item"+n+" .pic-list").append(str);
							//定时器
							$(".overplus").each(function(){
								var that=$(this);
								var t=$(this).attr("data-seconds");
								countDown(t,function( msg ){  
									that.html(msg)
							    }); 
							    
							});
						}	
					}
				}else{
					mui.toast(data.errmsg);
				}
			},
			error: function(res) {
				console.log(JSON.stringify(res))
			}
		});	
	}
	
	
	//定时器
	function countDown( maxtime,fn ){      
	   var timer = setInterval(function(){  
	       if(maxtime>=0){     
	             minutes = Math.floor(maxtime/60);     
	             seconds = Math.floor(maxtime%60);     
	              if(maxtime>60){
	             	msg = "去付款  "+minutes+":"+seconds;  
	             }else{
	             	msg = "去付款  "+seconds; 
	             }    
	             fn( msg );  
	             --maxtime;     
	        }     
	         else{     
	            clearInterval( timer );  
	            window.location.reload();   
	        }     
	    }, 1000);  
	} 
})
