//建立全局对象
var EventUtil = {
    //兼容其他浏览器的添加事件处理程序
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if(attachEvent){
            //兼容ie
            element.attachEvent("on" + type, handler);
        } else {
            //dom0级
            element["on" + type] = hanler;
        }

    },
    //获得兼容浏览器的事件对象
    getEvent:function(event){
        return event ? event : window.event;
    },
    //获得触发事件目标元素
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    //取消事件默认行为
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;         //ie浏览器
        }
    },
    //阻止冒泡
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBublle=true;         //ie浏览器
        }
    },
    //取得mouse over/out 的关联元素
    getRelatedTarget:function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;          //ie8及之前浏览器
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }

    },
    //获取按下了哪个鼠标按钮
    getButton:function(event){
        if(document.implementation.hasFeature("mouseEvents","2.0")){
            return event.button;
        }else{
            switch(event.buttton){
                case 0:
                case 1:
                case 3:
                case 5:                  //ie8及之前版本button属性差异大
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    //mouseWheel事件触发的鼠标滚轮增量值。在firefox是DomMouseScroll事件
    getWheelDelta:function(event){
        if(event.delta){
            return (client.engine.opera&&client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);//9.5以下opera数值是颠倒的
        }else{
            return -event.detail*40;   //firefox
        }
    },
    //ie8及opera在keyPress事件keyCode中保存ASCII编码，其他浏览器支持在keyPress的charCode中
    getCharCode:function(event){
        if(typeof event.charCode=="number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    },
    //移除事件处理程序
    removeHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.removeEventlistener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);   //ie浏览器
        } else {
            element["on" + type] = null;
        }
    },
    //访问剪贴板数据,opera浏览器不支持通过javascript访问。firefox safari chrome只允许在onpaste事件处理程序访问getData()方法
    getClipboardText: function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    //设置剪贴板数据，opera浏览器不支持通过javascript访问。
    setClipboardText: function (event,value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text", value);       //ie中
        }
    }


};