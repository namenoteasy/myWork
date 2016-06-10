/**
 * Created by lu on 2016/5/1.
 */
//限制范围的弹性碰撞运动
function autoMove(obj){    
     var iSpeedX=0,iSpeedY=0;
    obj.timer=setInterval(function(){
        iSpeedY+=3;
        var l=obj.offsetLeft+iSpeedX;
        var t=obj.offsetTop+iSpeedY;
        if(l>=document.documentElement.clientWidth-obj.offsetWidth){
            //水平碰撞的速度损耗系数
            iSpeedX*=-0.8;
            l=document.documentElement.clientWidth-obj.offsetWidth;
        }else if(l<=0){
            iSpeedX*=-0.8;
            l=0;
        }
        if(t>=document.documentElement.clientHeight-obj.offsetHeight){
            //竖直碰撞的速度损耗系数
            iSpeedY*=-0.8;
            //水平摩擦力
            iSpeedX*=0.8;
            t=document.documentElement.clientHeight-obj.offsetHeight;
        }else if(t<=0){
            iSpeedY*=-1;
            iSpeedX*=0.8;
            t=0;
        }
        //如果速度足够小，关闭定时器
        if(Math.abs(iSpeedX)<1&&Math.abs(iSpeedY)<1){
            iSpeedX=0;
            iSpeedY=0;
            clearInterval(obj.timer);
        }        
        obj.style.left=l+"px";
        obj.style.top=t+"px";
    },30)
    
}
function range(a,b,c){
    if (a<b){
        a=b;
    }else if(a>c){
        a=c;
    }
    return a;
}
//限制范围的拖拽
function toDrag(obj){
    obj.onmousedown = function(ev){
        var ev = ev||event;
        var disX=ev.clientX-this.offsetLeft;
        var disY=ev.clientY-this.offsetTop;
        if(obj.setCaptrue) {
            obj.setCaptrue();
        }
        document.onmousemove=function(ev){
            var ev=ev||event;
            var l=0,
                r=document.documentElement.clientWidth-obj.offsetWidth,
                t=0,
                b=document.documentElement.clientHeight-obj.offsetHeight;
            obj.style.left=ev.clientX-disX+"px";
            obj.style.left=range(obj.offsetLeft,l,r)+"px";
            obj.style.top=ev.clientY-disY+"px";
            obj.style.top=range(obj.offsetTop,t,b)+"px";
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