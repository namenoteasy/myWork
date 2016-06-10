//自定义事件类型的基本模式。其他自定义事件从它继承而来
function EventTarget() {
    this.handlers = {};          //用来存放自定义事件类型
}
EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] == "undefined") {     //handlers对象的属性名是否含有相应的类型
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);                  //往类型数组添加事件的回调函数
    },
    fire: function (event) {                                //传入的event对象，必须有type属性
        if (!event.target) {
            event.target = this;                           //指定事件的target属性为实例对象
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);                        //执行事件绑定的所有回调函数
            }
        }
    },
    removeHandler: function (type,hanler) {
        if (this.hanlers[type] instanceof Array) {
            var handlers = this.hanlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {    
                if (handlers[i] === handler) {             //在类型数组中寻找同名函数
                    break;
                }
            }
            handlers.splice(i, 1);                          //从数组中删除该函数
        }
    }

}