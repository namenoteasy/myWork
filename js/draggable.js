/**
 * Created by lu on 2016/6/2.
 */
//范围内拖拽
function toDrag(id_1,id_2){
    var obj_1=document.getElementById(id_1);
    var obj_2=document.getElementById(id_2);
    obj_1.onmousedown = function(ev){
        var ev = ev||event;
        obj_2.style.left=obj_2.offsetLeft+"px";
        obj_2.style.top=obj_2.offsetTop+"px";
        obj_2.style.margin="auto";
        var disX=ev.clientX-obj_2.offsetLeft;
        var disY=ev.clientY-obj_2.offsetTop;
        if(obj_2.setCaptrue) {
            obj_2.setCaptrue();
        }
        document.onmousemove=function(ev){
            var ev=ev||event;
            var l=0,
                r=document.documentElement.clientWidth-obj_2.offsetWidth,
                t=0,
                b=document.documentElement.clientHeight-obj_2.offsetHeight;
            obj_2.style.left=ev.clientX-disX+"px";
            obj_2.style.left=range(obj_2.offsetLeft,l,r)+"px";
            obj_2.style.top=ev.clientY-disY+"px";
            obj_2.style.top=range(obj_2.offsetTop,t,b)+"px";
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if(obj_2.releaseCaptrue) {
                obj_2.releaseCaptrue();
            }
        };
        return false;
    }
}
function range(a,b,c){
    if (a<b){
        a=b;
    }else if(a>c){
        a=c;
    }
    return a;
}