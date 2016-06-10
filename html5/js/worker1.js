/**
 * Created by lu on 2016/5/24.
 */
onmessage=function(){
    var intArray=new Array(100);   
    for(var i=0;i<intArray.length;i++){
        intArray[i]=parseInt(Math.random()*100);       
    }
    postMessage(JSON.stringify(intArray));
};