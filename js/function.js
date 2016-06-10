//ios2.0中的safari手势事件
function handleGestureEvent(event, outPut) {  //output:要放入信息的元素
    
    switch (event.type) {
        case "gesturestart":
            outPut.innerHTML = "gesture started (rotation=" + event.rotation + ",scale=" + event.scale+")";
            break;
        case "gestureend":
            outPut.innerHTML = "gesture ended (rotation=" + event.rotation + ",scale=" + event.scale + ")";
            break;
        case "gesturechange":
            outPut.innerHTML = "gesture changed (rotation=" + event.rotation + ",scale=" + event.scale + ")";
            break;
    }
}

//触摸事件支持的浏览器：ios的 safari ，android 的webkit  只有ios支持多点触摸
function handleTouchEvent(event, outPut) {      //output:要放入信息的元素
    if (event.touches.length == 1) {
       
        switch (event.type) {
            case "touchstart":
                outPut.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
            case "touchend":
                outPut.innerHTML = "Touch ended (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
            case "touchmove":
                outPut.innerHTML = "Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
        }
    }
}

//取得文本框中文本
function getSelectedText(textbox) {
    if (typeof textbox.selectionStart == "number") {
        return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
    } else if (document.selection) {
        return document.selection.createRange().text;  //ie8及更早版本
    }

}

//选择文本框中片段文本
function selectedText(textbox,startIndex,stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange();                //ie8及更早版本
        range.collapse(true);
        range.moveStart("charater", startIndex);       
        range.moveEnd("charater", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}

//过滤输入，onpress事件
function handleTextFilter(event,pattern) {                   //pattern要屏蔽的正则
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);
    if (pattern.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {   //删除键等小于10
        EventUtil.preventDefault(event);
    }
}

//自动切换焦点,适用于文本框紧邻的情况
function autoTextFocus(event,textbox1,textbox2){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.value.length == target.maxLength) {              //如果内容长度达到最大允许长度，切换
        var form = target.form,
            elements=form.elements;
        for (var i = 0, len = form.elements.length; i < len; i++) {
            if (elements[i] == target) {
                if (elements[i + 1]) {
                    elements[i+1].focus();                     //下一个输入框获得焦点
                    
                }
                return;
            }
        }
    }
}

//表单序列化
function serialize(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    for (i = 0, len = form.elements; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {       //遍历option
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);  //与dom兼容的浏览器
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text); //在ie下
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));    //往数组填充
                        }
                    }
                }
                break;
            //不序列化    
            case undefined:             //<fieldset>元素
            case "file":                //文件内容无法模拟
            case "button":               
            case "submit":
            case "reset":

                break;
                
            case "radio":              //单选
            case "checkbox":           //多选框
                if (!field.checked) {  //未选中
                    break;
                }
            default:                 //文本框
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }

    }
    return parts.join("&");
}

//为url添加编码的查询字符串
function addQueryStringArg(url, name, value) {
    if (url.indexOf("?") == -1) {

        url += "?";
    } else {
        url+="&"
    }
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

//把错误提交给服务器,可以放在catch语句里
function logError(url,sev, msg) {           //sev表示严重程度，msg消息
    var img = new Image();
    img.src = url + "?sev=" + encodeURIComponent(sev) + "&message=" + encodeURIComponent(msg);
}

//将消息记录到控制台,ie7以下可以用把消息记录到当前页面的方法
function log(message) {
    if (typeof console == "object") {                          //ie8,firebug,chrome,safari
        console.log(message);
    } else if (typeof opera == "object") {
        opera.postError(message);                             //opera
    } else if (typeof java == "object" && typeof java.lang == "object") {
        java.lang.System.out.println(message);                 // firefox,safari,opera 
    }
}

//创建适应ie浏览器版本的xml文档
function createDocument() {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],//最后一个是针对ie5.5之前
            i, len;
        for (i = 0, len = versions.length; i < len; i++) {
            try{
                new ActiveXObject(version[i]);
                arguments.callee.activeXString=versions[i];            //把版本放入函数的activeXString属性里
                break;
            } catch (ex) {
                //跳过
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

//跨浏览器处理xml字符串,应该把调用函数放入try catch语句，防出错
function parseXml(xml) {
    
    if (typeof DomParser != "undefined") {
        var xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
        var errors = xmldom.getElementByTagName("parsererror");   //如果错误会返回文档元素是<parseerror>的文档
        if (errors.length) {                              
            throw new Error("XML parsing error:" + errors[0].textContent);
        }
    } else if (typeof ActiveXObject != "undefined") {    //ie浏览器
        xmldom = createDocument();                      //调用用于ie的createDocument()方法
        xmldom.loadXML(xml);
        if (xmldom.parseError != 0) {                  //ie浏览器会抛出错误
            throw new Error("XML parsing error:" + xmldom.parseError.reason);
        }
    } else {
        throw new Error("NO XML parser available"); 
    }
}

//序列化xml dom文档为字符串
function serializeXml(xmldom) {
    if (typeof XMLserializer != "undefined") {
        return (new XMLSerializer()).serializeToString(xmldom);
    } else if(typeof xmldom.xml!="undefined"){             //ie中用文档对象的xml属性保存文本
        return xmldom.xml;
    } else {
        throw new Error("Could not serialize XML DOM.")
    }
}

//ajax,所有浏览器
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        createXHR = function () { return new XMLHttpRequest(); };
    } else if (typeof ActiveXObject != "undefined") {       //ie7之前版本
        createXHR = function () {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
             i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function () { throw new Error("No XHR object available.") };
    }
    return createXHR;
}

//跨浏览器的cors
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);             //其他浏览器要用绝对url来跨域请求
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRquest();               //ie
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

//Http流  :保持连接，不断接受服务器推送，除ie浏览器外都支持
function createStreamingClient(url, progress, finished) {
    var xhr = new XMLHttpRequest(),
        received = 0;
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {
            result = xhr.responseText.subtring(received);
            received += result.length;
            progress(result);                   //处理新消息
        } else if (xhr.readyState == 4) {
            finished(xhr.responseText);         //响应结束，处理全部内容
        }
    }
    xhr.send(null);
    return xhr;
}

//函数绑定
function bind(fn, context) {
    return function () {
        return fn.apply(context, arguments);
    };
}

//柯里化函数
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null,finalArgs)
    }
}


//数组分块
function chunk(array, process, context, interval) {   //array待办项目列表
    setTimeout(function () {
        var item = array.shift();
        process.call(context, item);
        if (array.length > 0) {
            setTimeout(arguments.callee, interval);
        }
    }, interval);
}


//函数节流。在interval时间间隔，method只执行一次
function throttle(method, context,interval) {
    clearTimeout(method.tid);
    method.tid = setTimeout(function () {
        method.call(context);
    },interval)
}

//获取元素相对文档的绝对位置
function getPos(element) {
    var obj = { left: 0, top: 0 };
    while(elment.offsetParent!==null){
        obj.left += element.offsetLeft;
        obj.top += element.offsetTop;
        element = element.offsetParent;
    }
    return obj;
}

//获取页面视口大小
function getViewport() {
    if (document.compatMode == "BackCompat") {                //检测是否运行在混杂模式（ie7以下）
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}

//确定文档大小
function getDocSize() {
    var obj = { height: 0, width: 0 },
        docHeight,docWidth;
    if (document.compatMode !== "BackCompat") {               //非混杂模式
        //不同浏览器的scrollTop（left），clientTop（left）不一样
        docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
        docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
    } else {
        docHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
        docWidth = Math.max(document.body.scrollWidth, document.body.clientWidth);
    }
    obj.height = docHeight;
    obj.width = docWidth;
    return obj;
}
//chrome没有documentElement.scrollTop
//var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
