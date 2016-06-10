/**
 * Created by lu on 2016/5/1.
 */
//用来实现碰撞运动
function rangeSpeed(obj){
    //声明变量
    var lastX=0,lastY=0;
    obj.onmousedown = function(ev){
        var ev = ev||event;
        var disX=ev.clientX-this.offsetLeft;
        var disY=ev.clientY-this.offsetTop;
        document.onmousemove=function(ev){
            var ev=ev||event;
            var l=ev.clientX;
            var t=ev.clientY;
            obj.style.left=l-disX+"px";
            obj.style.top=t-disY+"px";
            //速度与鼠标事件间距相关
            iSpeedX=(l-lastX)*3;
            iSpeedY=(t-lastY)*3;
            lastX=l;
            lastY=t;
        };
        document.onmouseup = function() {
            document.title=iSpeedX+"|"+iSpeedY;
            document.onmousemove = document.onmouseup = null;
            //鼠标松开开始运动
            startMove(obj);
        };
        //点击清除前次定时器
        clearInterval(obj.timer);
        return false;
    };
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}
function startMove(obj){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        iSpeedY+=3;
        var l=obj.offsetLeft+iSpeedX;
        var t=obj.offsetTop+iSpeedY;
        var dir;
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
            console.log(iSpeedX)
            if(iSpeedX>0){
                dir="normal";
            }
            if(iSpeedX<0){
                dir="reverse";
            }
            console.log(dir)
            obj.style.animation="rotation 3s linear infinite "+dir;
        }else if(t<=0){
            iSpeedY*=-1.2;
            iSpeedX*=0.8;
            t=0;
        }
        if(Math.abs(iSpeedX)<1){
            iSpeedX=0;
        }
        if(Math.abs(iSpeedY)<1){
            iSpeedY=0;
        }
        //如果速度足够小，关闭定时器
        if(iSpeedX==0&&iSpeedY==0&&t==(document.documentElement.clientHeight-obj.offsetHeight)){
            clearInterval(obj.timer);
            obj.style.animationPlayState="paused";
        }
        obj.style.left=l+"px";
        obj.style.top=t+"px";
    },30);
}
function range(a,b,c){
    if (a<b){
        a=b;
    }else if(a>c){
        a=c;
    }
    return a;
}
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
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if(obj.releaseCaptrue) {
                obj.releaseCaptrue();
            }
        };
        return false;
    };
}