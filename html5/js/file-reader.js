/**
 * Created by lu on 2016/6/5.
 */
//读取文件信息
var filesList=document.getElementById("files-list");
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
            progress.innerHTML=parseFloat(event.loaded/event.total)+"% Complete.<br/>total:"+event.total;
        }
    };
    reader.onload=function () {
        var html="";
        switch(type){
            case "image":
            html="<img src=\""+reader.result+"\">";
            break;
            case "text":
                html=reader.result;
                break;
        }
        output.innerHTML=html;
    };
});
