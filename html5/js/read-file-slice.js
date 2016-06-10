/**
 * Created by lu on 2016/6/5.
 */
//slice的兼容写法
function blobSlice(blob,startByte,length){
    if(blob.slice){
        return blob.slice(startByte,length);
    }else if(blob.webkitSlice){
        return blob.webkitSlice(startByte,length);
    }else if(blob.mozSlice){
        return blob.mozSlice(startByte,length);
    }else{
        return null;
    }
}
//读取文件片段
var filesList=document.getElementById("files-list");
EventUtil.addHandler(filesList,"change",function(event){
    var output=document.getElementById("output"),
        progress=document.getElementById("progress"),
        files=EventUtil.getTarget(event).files,
        reader=new FileReader(),
        blob=blobSlice(files[0],0,32);
    if(blob){
        reader.readAsText(blob);
        reader.onerror=function () {
            output.innerHTML="Could not read file,error code is"+reader.error.code;
        };
        reader.onload=function(){
            output.innerHTML=reader.result;
        };
    }else{
        alert("Your browser doesn't support slice().");
    }
});
