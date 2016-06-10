// JavaScript Document

function toDrag(obj){
	obj.onmousedown = function(ev){
		var ev = ev||event;
		var disX=ev.clientX-this.offsetLeft;
		var disY=ev.clientY-this.offsetTop;
		//兼容ie
		if(obj.setCaptrue) {
			obj.setCaptrue();
		}
		document.onmousemove=function(ev){
			var ev=ev||event;
			obj.style.left=ev.clientX-disX+"px";
			obj.style.top=ev.clientY-disY+"px";
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if(obj.releaseCaptrue) {
				obj.releaseCaptrue();
			}
		}
		return false;
	}
}
//弹性运动
function startMove(obj,target) {
var iSpeed=0;
	//清除前一次的定时器
clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		//速度大小
		iSpeed+=(target-obj.offsetLeft)/5;
		//损耗系数0.8
		iSpeed*=0.8;
//如果间距和速度足够小，关闭定时器
		if(Math.abs(obj.offsetLeft-target)<1&&Math.abs(iSpeed)<1){
			clearInterval(obj.timer);
			obj.style.left=target+"px";
		}else{
			obj.style.left=obj.offsetLeft+iSpeed+"px";
		}
	},30);

}


function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}

}