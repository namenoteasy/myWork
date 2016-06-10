/**
 * Created by lu on 2016/4/30.
 */
function toDrag(object){
    object.onmousedown = function(ev){
        var ev = ev||event;
        var disX=ev.clientX-this.offsetLeft;
        var disY=ev.clientY-this.offsetTop;
        if(object.setCaptrue) {
            object.setCaptrue();
        }
        document.onmousemove=function(ev){
            var ev=ev||event;
            object.style.left=ev.clientX-disX+"px";
            object.style.top=ev.clientY-disY+"px";
        }
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if(object.releaseCaptrue) {
                object.releaseCaptrue();
            }
        }
        return false;
    }
}
//缓冲运动框架
function startMove(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        //一定要在这里声明bBtn并初始化为true
        var bBtn=true;
        for (var attr in json) {
            var iSpeed,
                iCur=0;
            if(attr=="opacity"){
                //处理浮点数
                if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
                    iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
                }
                else{
                    //opacity未声明则返回null
                    iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
                }
                iSpeed=(json[attr]*100-iCur)/8;
            }else{
                iCur=parseInt(getStyle(obj,attr))||0;
                iSpeed=(json[attr]-iCur)/8;
            }
            iSpeed= (iSpeed>0) ?Math.ceil(iSpeed):Math.floor(iSpeed);
            //只要有一个属性没达到目标值，bBtn就为false
            if(attr=="opacity"){
                if(iCur!=json[attr]*100){   //注意要乘100
                    bBtn=false;
                }
            }else{
                if(iCur!=json[attr]){
                    bBtn=false;
                }
            }
            if(attr=="opacity"){                
                obj.style.opacity=(iCur+iSpeed)/100;
            }else{
                obj.style[attr]=iCur+iSpeed+"px";                
            }           
        }
        //都到达目标值
        if(bBtn){            
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
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