/**
 * Created by lu on 2016/5/11.
 */
function orientationChange() {
    switch(window.orientation) {
        case 0:
            alert("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height);
            break;
        case -90:
            alert("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height);
            break;
        case 90:
            alert("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height);
            break;
        case 180:
            alert("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height);
            break;
    };};

/*addEventListener('load', function(){
    orientationChange();
    window.onorientationchange = orientationChange;
});*/

//300ms delay  必须在回调函数stopPropagation(),preventDefault()

var keyboard = document.getElementById("keyboard");
var buttons = keyboard.children;
var isTouch = ("ontouchstart" in window);
for (var i=0;i<buttons.length;i++) {
    if ( isTouch ) {
        buttons[i].addEventListener('touchstart', clickHandler, false);
    } else {
        buttons[i].addEventListener('click', clickHandler, false);
    }
}

//模拟:hover伪类
/*
 var myLinks = document.getElementsByTagName('a');
 for(var i = 0; i < myLinks.length; i++){
 　　myLinks[i].addEventListener(’touchstart’, function(){this.className = “hover”;}, false);
 　　myLinks[i].addEventListener(’touchend’, function(){this.className = “”;}, false);
 }
* */

//摇一摇
if (window.DeviceMotionEvent) { window.addEventListener('devicemotion',deviceMotionHandler, false);}
var speed = 30;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandler(eventData) {
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed || Math.abs(z - lastZ) > speed) {
        alert('别摇那么大力嘛...')
// your code here
        lastX = x;
        lastY = y;
        lastZ = z;
    }
}

/*
var v = localStorage.getItem('n') ? localStorage.getItem('n') : "";   // 如果名称是  n 的数据存在 ，则将其读出 ，赋予变量  v  。
localStorage.setItem('n', v);                                           // 写入名称为 n、值为  v  的数据
localStorage.removeItem('n');
*/