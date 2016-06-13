/**
 * Created by lu on 2016/6/13.
 */
$(document).ready(function () {
    $(".arrow-round").each(function () {
        $(this).hover(function () {
            console.log(this)
            $(this).find(".p-arrow").css({"transform":"rotate(180deg)","transition":"transform 0.3s"});
        },function () {
            $(this).find(".p-arrow").css({"transform":"rotate(0deg)","transition":"transform 0.3s"});
        });
    })
});