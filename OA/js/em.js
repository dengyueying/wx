window.onload=function(){
	var whichEl;
	window.onresize=function(){
		em();
	}
	function em(){
		whichEl = document.getElementsByTagName("body")[0];
whichEl.style.fontSize=(innerWidth*16)/375+"px";
	}
	em();
}
