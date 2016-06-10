/**
 * Created by lu on 2016/6/7.
 */

//过滤输入，onkeypress事件
function handleTextFilter(event,pattern) {                   //pattern要屏蔽的正则
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);
    if (pattern.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {   //删除键等小于10
        EventUtil.preventDefault(event);
    }
}
