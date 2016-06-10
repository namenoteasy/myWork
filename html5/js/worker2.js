/**
 * Created by lu on 2016/5/24.
 */
onmessage=function(ev){
   var intArray=JSON.parse(ev.data);
    var returnStr="";
    for(var i=0;i<intArray.length;i++){
        if(intArray[i]%3==0){
            if(returnStr!=""){
                returnStr+=";";
            }
            returnStr+=intArray[i];
        }        
    }
    postMessage(returnStr);
    close();
}