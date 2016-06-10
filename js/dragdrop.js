//用模块模式，创建单例对象。对设置“draggable”类的元素实现拖放功能
var DragDrop = function () {
    var dragdrop = new EventTarget();         //自定义事件实例化
    var dragging = null,
        diffX = 0,
        diffY = 0;
    
    function handleEvent(event) {
        event = EventUtil.getEvent(event);
        var target = EvenUtil.getTarget(event);
        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {      //对类名含draggable元素
                    dragging = target;                                 //把鼠标按下的元素对象赋予另外一个变量
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({type:"dragstart",target:dragging,x:event.clientX,y:event.clientY})
                }
                break;
            case "mousemove":
                if (dragging !== null) {
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    //触发自定义事件
                    dragdrop.fire({ type: "drag", target: dragging, x: event.clientX, y: event.clientY }) 
                }
                break;
            case "mouseup":
                dragdrop.fire({ type: "dragend", target: dragging, x: event.clientX, y: event.clientY })
                dragging = null;                                      //释放该元素
                break;
        }
    };
    
    dragdrop.enable=function () {
        EvenUtil.addHandler(document, "mousedown", handleEvent);
        EvenUtil.addHandler(document, "mousemove", handleEvent);
        EvenUtil.addHandler(document, "mouseup", handleEvent);

    };
    dragdrop.disable= function () {
        Event.removeHandler(document, "mousedown", handleEvent);
        Event.removeHandler(document, "mousemove", handleEvent);
        Event.removeHandler(document, "mouseup", handleEvent);
    };
    return dragdrop;

}();
//像下面一样添加自定义事件
//DragDrop.addHandler("dragstart",fn)