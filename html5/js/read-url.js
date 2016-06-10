/**
 * Created by lu on 2016/6/5.
 */
//创建url对象的兼容写法
function createObjectURL(blob){
    if(window.URL){
        return window.URL.createObjectURL(blob);
    }else if(window.webkitURL){
        return window.webkitURL.createObjectURL(blob);
    }else{
        return null;
    }
}
//读取图片url
var filesList=document.getElementById("files-list");
EventUtil.addHandler(filesList,"change",function(event){
    var output=document.getElementById("output"),
        progress=document.getElementById("progress"),
        files=EventUtil.getTarget(event).files,
        url=createObjectURL(files[0]);
    if(url){
        if(/image/.test(files[0].type)) {
            output.innerHTML="<img src=\""+url+"\">";
        }else{
            output.innerHTML="not a image."
        }
    }else {
        output.innerHTML="Your browser doesn't support object URLs.";
    }
    revokeObjectURL(url);
});
//清除url对象的兼容写法
function revokeObjectURL(url){
    if(window.URL){
        window.URL.revokeObjectURL(url);
    }else if(window.webkitURL){
        window.webkitURL.revokeObjectURL(url);
    }
}