/**
 * Created by lu on 2016/6/5.
 */

//拖拽通过ajax上传
var dropTarget=document.getElementById("droptarget");
var filesList=document.getElementById("files-list");
var readingBar=document.getElementById("reading-bar");

EventUtil.addHandler(dropTarget,"dragenter",handleEvent);
EventUtil.addHandler(dropTarget,"dragover",handleEvent);
EventUtil.addHandler(dropTarget,"drop",handleEvent);
EventUtil.addHandler(filesList,"change",function(event){
    var output=document.getElementById("output"),
        progress=document.getElementById("progress"),
        files=EventUtil.getTarget(event).files,
        type="default",
        reader=new FileReader();
    if(/image/.test(files[0].type)){
        reader.readAsDataURL(files[0]);
        type="image";
    }else{
        reader.readAsText(files[0]);
        type="text";
    }
    reader.onerror=function(){
        output.innerHTML="Could not read file,error code is"+reader.error.code;
    };
    reader.onprogress=function(event){
        if(event.lengthComputable){
            progress.innerHTML=parseFloat(100*event.loaded/event.total)+"% Complete.<br/>total:"+event.total;
            readingBar.style.width=parseFloat(event.loaded/event.total)*500+"px";
        }
    };
    reader.onload=function () {
        var html="";
        switch(type){
            case "image":
                html+="<img src='"+reader.result+"' style='width: 100px;height:auto;' >";
                break;
            case "text":
                html+="<p>"+reader.result+"</p>";
                break;
        }
        output.innerHTML=html;
    };
});
function handleEvent(event) {
    var info="",
        infoWindow=document.getElementById("info"),
        data,xhr,
        files,i,len;
    EventUtil.preventDefault(event);
    if(event.type=="drop"){
        data=new FormData();
        files=event.dataTransfer.files;
        i=0;
        len=files.length;
        while(i<len){
            info+=files[i].name+"("+files[i].type+","+files[i].size+"bytes)<br>";
            data.append("file"+i,files[i]);
            i++;
        }
        infoWindow.innerHTML=info;
        xhr=new XMLHttpRequest();
        xhr.open("post","worker.html",true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                alert(xhr.responseText);
            }
        };
        xhr.send(data);
    }
}