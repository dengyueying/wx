$(function(){
	var flag=false,val=true,city=[],Json,adressId=0;
	var storage = window.localStorage;
			mui.init();
			if(storage.adress!=0){
				$.ajax({ //地址详情
					url:'http://192.168.1.156:9090/api/address/detail',
					type: "post",
					dataType: 'json',
					data:{
						id:storage.adressId,
					},
					success: function(data) {
						console.log(JSON.stringify(data));
						if(data.errno==0){
							$("#city").val(data.data.provinceName+" "+data.data.cityName+" "+data.data.countyName);
							$("#adress").val(data.data.detailInfo);
							$("#name").val(data.data.userName);
							$("#phone").val(data.data.telNumber);	
							adressId=storage.adressId;
						}else{
							mui.toast(data.msg);
						}
					},
					error: function(res) {
						console.log(JSON.stringify(res))
					}
				});
			}
			$("#adress").on("input",function(){
				changebackg();
			});
			$("#name").on("input",function(){
				$(this).val($(this).val().trim());
				changebackg();
			});			
			//电话号码只能输数字
			$("#phone").on("input",function(){
				$(this).val($(this).val().trim());
				if(isNaN($("#phone").val())){
					$("#phone").val($("#phone").val().replace(/[^0-9-]+/,''));
				}
				changebackg();
			});
			
			//保存地址
			$("footer").on("click",function(){
				if($("footer").hasClass("foot")){
					flag=false;
					val=true;
					if(val){
						$("input").each(function(index) {
							if($(this).val() == '' || !$(this).val()) {
								var label = $(this).attr("placeholder");
								mui.toast(label + "不能为空");
								val = false;
								return false;
							}
						});
						if(val){
							if(!(/^1[34578]\d{9}$/.test($("#phone").val()))) {
								mui.toast('请输入正确的手机号码');
							} else {
								$.ajax({
									url:'http://192.168.1.156:9090/api/address/save',
									type: "post",
									dataType: 'json',
									headers: {
						              'X-Nideshop-Token':storage.token,
						              "Content-Type":"application/json;charset=UTF-8"
						          	},
									data:JSON.stringify(getJson()),
									success: function(data) {
										console.log(JSON.stringify(getJson()));
										console.log(JSON.stringify(data));
										console.log(storage.token);
										if(data.errno==0){
											mui.toast("保存成功");
											window.history.back();	
										}
										else{
											mui.toast(data.msg);
										}
									},
									error: function(res) {
										console.log(JSON.stringify(res))
									}
								});
							}	
						}
						
					}
					setTimeout(function(){
						flag=true;
					},800);
				}
			});	
			//设为默认地址
			$("#check").on("click",function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
				}else{
					$(this).addClass("active");
				}
			});
			
			mui.ready(function(){
				//选择城市
				
				var _getParam = function(obj, param) {
					return obj[param] || '';
				};
				var cityPicker3 = new mui.PopPicker({
					layer: 3
				});
				
				cityPicker3.setData(cityData3);
				var citybtn = document.getElementById('citybtn');
				var city = document.getElementById('city');
				$("#citybtn").on('click', function(event) {
					cityPicker3.show(function(items) {
						city.value =_getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
						changebackg();
					});
				});
			});
			function changebackg(){
				if($("#city").val()!=""&&$("#adress").val()!=""&&$("#name").val()!=""&&$("#phone").val()!=""){
					$("footer").addClass("foot");
				}
				else{
					$("footer").removeClass("foot");
				}
			}
		
		function getJson(){
			city=$("#city").val().split(" ");
			Json={
				'id': adressId, 
			    'userName':$("#name").val(), 
			    'telNumber': $("#phone").val(), 
			    'postalCode': "400001", 
			    'nationalCode': "333333", 
			    'provinceName':city[0], 
			    'cityName':city[1], 
			    'countyName':city[2], 
			    'detailInfo': $("#adress").val(),
			}
			return Json;
		}
			
})
