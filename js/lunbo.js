/**
 * Created by lu on 2016/6/9.
 */
$(document).ready(function () {
    var   ul=document.getElementById("pic-wr");
    var  li=ul.getElementsByTagName("li");
    var  btn=document.getElementById("btn");
    var  wid=li[0].offsetWidth;
    var iNum=4;
    var bool=true;
    function getWidth() {
        ul.style.width=li.length*wid+"px";
    }
    getWidth();
    btn.onclick=function () {
        scroll(ul,li,iNum,wid);
    }
    function scroll(ul,li,iNum,wid) {
        if(bool){
            bool=false;
            for (var i = 0; i < iNum; i++) {
                var cLi = li[i].cloneNode(true);
                ul.appendChild(cLi);
                getWidth();
            }
            startMove(ul, {left: -wid * iNum}, function () {
                for (var i = 0; i < iNum; i++) {
                    ul.removeChild(li[0]);
                    ul.style.left = 0;
                }
                bool=true;
            });
        }
    }
   /*setTimeout(function () {
        scroll(ul,li,iNum,wid);
        setTimeout(arguments.callee,1000)
    },3000);*/
});