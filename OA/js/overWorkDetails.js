$(function(){
	var n, m, x, y,h,flag=false,timer=null,str,namet;
	var storage = window.localStorage;
			//查看审批进度
			$("#boxspeed").click(function() {
				$("#listbox").toggle();
				h=$("#listbox").outerHeight(true);
				if($(this).children("span").hasClass("active")) {
					$(this).children("span").removeClass("active");
					$(window).scrollTop($(window).scrollTop());
				} else {
					$(this).children("span").addClass("active");
					$(window).scrollTop($(window).scrollTop()-0+h);
				}
			});
	
	//获取工作数据
	mui.post('http://192.168.1.120:8082/BS56/appform/'+storage.formId+'/'+storage.longId+'.formDesc',{},
		function(data){
			console.log(JSON.stringify(data));
			for (let i=0;i<data.list.length;i++) {
				if(data.list[i].formNameDesc!=""){
					namet=data.list[i].name;
					console.log(data.list[i].formNameDesc);
					if(data.list[i].dataType!=12){
						str='<div class="cont box3 sheight border">';
							str+='<span class="text">'+data.list[i].formNameDesc+'</span>';
							str+='<span class="rightNext fl-right">'+data.list[i][namet]+'</span>';
						str+='</div>';
					}else{
						str='<div class="box3 box">';
						str+='<div class="cont sheight border">';
						str+='<span class="text">'+data.list[i].formNameDesc+'</span>';
						str+='</div>';
						str+='<textarea disabled="disabled" class="csign border">'+data.list[i][namet]+'</textarea>';	
						str+='</div>';
						
					}
					if($("body").find("#agree").length!=0){
						$("#agree").before(str);
					}else{
						$("#getSpeed").before(str);
					}
				}	
			}
			if(data.getSpeed){
				$("#getSpeed").remove();
			}else{
				$("#getSpeed").removeClass("mui-hidden");
				for (let i=0; i<data.getSpeed.toExamine.length;i++) {
					var x=parseInt(i)+1;
					str='<ul class="ic-list pad bordersb">';
						str+='<li>';
							str+='<p class="result"><span class="point">「'+data.getSpeed.TITLE+'」</span>由<span class="point">「'+data.getSpeed.USERNAME+'」</span>发起<span class="num">'+x+'</span></p>';
							str+='<img class="step" src="img/icon-step.png" />'
						str+='</li>';
						str+='<li>';
							str+='<p><span>审批人:</span><span class="name info">'+data.getSpeed.toExamine[i].userName+'</span></p>';
						str+='</li>';
						str+='<li>';
							str+='<p><span>审批时间:</span><span class="info">'+data.getSpeed.toExamine[i].createTime+'</span></p>';
						str+='</li>';
					str+='</ul>';
					$("#listbox").append(str);
				}
			}
			
		},'json'
	);
	
})
