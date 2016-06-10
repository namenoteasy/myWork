/**
 * Created by lu on 2016/6/7.
 */
$(document).ready(function () {
    $(".pop-fm input[name=need]").bind("change",function () {
        var state=$(".pop-p0")[0];
        if(this.checkValidity()){
            //表单有效继续
            state.innerHTML="输入有效";
            $(".pop-p0").css("color","green");
        }else{
            $(".pop-p0").css("color","red");
            for(var attr in this.validity){
                if(this.validity[attr]==true){
                    switch(attr){
                        case 'badInput':state.innerHTML="*badInput";break;
                        case 'customError':state.innerHTML="*未验证";break;
                        case 'patternMismatch':state.innerHTML="*格式不对";break;
                        case 'rangeOverflow':state.innerHTML="*超过最大范围值";break;
                        case 'rangeUderflow':state.innerHTML="*小于最小范围值";break;
                        case 'stepMisMatch':state.innerHTML="*步长值不合理";break;
                        case 'tooLong':state.innerHTML="*超过字符限制";break;
                        case 'tooShort':state.innerHTML="*太短了";break;
                        case 'typeMismatch':state.innerHTML="*不是输入框指定的类型";break;
                        case 'valueMissing':state.innerHTML="*一定要填写";break;
                        default:state.innerHTML="*未知类型的验证错误";
                    }
                }
            }

        }
    });
});
