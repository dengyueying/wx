$(function(){
	var flag=false;
			mui.init();
			$("#city").on("input",function(){
				changebackg();
			});
			$("#adress").on("input",function(){
				$(this).val($(this).val().trim());
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
			$(".foot").on("click",function(){
				flag=true;
				if(flag){
					if(!(/^1[34578]\d{9}$/.test($("#phone").val()))) {
						mui.toast('请输入正确的手机号码');
					} else {
						mui.toast('保存成功');
						mui.back();
					}
				}
				setTimeout(function(){
					flag=false;
				},800);
			})
			//设为默认地址
			$("#check").on("click",function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
				}else{
					$(this).addClass("active");
				}
			})
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
})
