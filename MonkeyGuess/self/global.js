if(typeof window.xhong === 'undefined'){
	window.xhong = {};
}
xhong.$ = function(id){
	return document.getElementById(id);
}
xhong.event = {
	addEventListener: function(elem,type,fun){
		if(window.addEventListener){
			elem.addEventListener(type, fun, false)
		}else{
			elem.attachEvent('on'+type, fun);
		}
	}
};