$(function(){
		var str;
		var storage = window.localStorage;
			//进入编辑地址页面
			$(".adr-list").on("click","li .icon",function(e){
				storage.adress=1;
				storage.adressId=$(this).attr('id');
			});
			//新增地址
			$("footer").on("click", function() {
				storage.adress=0;
			});
			//选中地址
			$(".adr-list").on("click","li",function(e){
				 mui.back();
			});
			
		//收货地址列表
		$.ajax({
			url:'http://192.168.1.156:9090/api/address/list',
			type: "post",
			dataType: 'json',
			headers: {
              'X-Nideshop-Token':storage.token
          	},
			success: function(data) {
				console.log(storage.token);
				console.log(JSON.stringify(data));
				if(data.errno==0){
					if(data.data==""){
						$("#list").html('<p style="height: 100px;line-height: 100px;text-align: center;">您还没有收货地址</p>');
					}
					else{
						for (let i=0;i<data.data.length;i++) {
							str='<li class="borderbot pad mui-table-view-cell">';
								str+='<p class="number">';
	//							if(){//是默认地址
	//								str+='<span class="default">默认</span>';
	//							}
									str+='<span class="name">'+data.data[i].userName+'</span>';
									str+='<span class="ipone">'+data.data[i].telNumber+'</span>';
								str+='</p>';
								str+='<p class="adress mui-ellipsis">'+data.data[i].provinceName+data.data[i].cityName+data.data[i].countyName+'&nbsp;'+data.data[i].detailInfo+'</p>';
								str+='<div class="icon" id='+data.data[i].id+'>';
									str+='<a href="adressedit.html">';
									str+='<i class="icon-adrs"></i>';
									str+='</a>';
								str+='</div>';
							str+='</li>';
							$("#list").append(str);
						}
					}	
				}
				else{
					mui.toast(data.errmsg);
				}
			},
			error: function(res) {
				console.log(JSON.stringify(res))
			}
		});
})
