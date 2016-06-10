/**
 * Created by lu on 2016/6/9.
 */
$(document).ready(function () {
    var bar=$("#pic-wr");
    var preBtn=$(".prev_div");
    var nextBtn=$(".next_div");
    var wid=$("li").width();
    var iNow=0;
    var len=$("#pic-wr li").length;
    rolling(bar,preBtn,nextBtn,wid,iNow,len);
    function rolling(bar,preBtn,nextBtn,wid,iNow,len) {
        setTimer();
        preBtn.click(function () {
            clearInterval(rolling.timer);
            iNow++;
            if(iNow>0){
                iNow=0;
            }
            bar.animate({left:wid*iNow});
            setTimer();
        });
        nextBtn.click(function () {
            clearInterval(rolling.timer);
            iNow--;
            if(iNow<-(len-1)){
                iNow=-(len-1);
            }
            bar.animate({left:wid*iNow});
            setTimer();
        });
        $("input.preview").click(function (ev) {
            clearInterval(rolling.timer);
            var index=$("input.preview").index(ev.target);
            bar.animate({left:wid*-index});
            iNow=-index;
            setTimer();
        });
        function setTimer() {
            rolling.timer=setInterval(function () {
                iNow--;
                if(iNow<-(len-1)){
                    iNow=0;
                }
                bar.animate({left:wid*iNow});
            },3000);
        }
    }
});