/**
 * Created by lu on 2016/6/5.
 */
var box=document.getElementById("box");
var target=document.getElementById("target");
dragFromTo(box,target);
function dragFromTo(obj,target) {
    obj.addEventListener("dragstart",effect_allow,false);
    target.addEventListener("dragenter",handler,false);
    target.addEventListener("dragover",drop_effect,false);
    target.addEventListener("drop",handler,false);
}
function handler(ev){
    ev.preventDefault();
}
function drop_effect(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect="link";
}
function effect_allow(ev){
    ev.dataTransfer.effectAllowed="link";
    ev.dataTransfer.setData("text","你好");
}