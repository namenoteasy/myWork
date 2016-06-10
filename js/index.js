$(function() {
    if($('.slide_image').length>0){
        //»ÃµÆÆ¬
        var image_list = $('.slide_image_item');
        var btns = $('.slide_image_btns a');
        var sum = btns.length;
        if (sum < 2) {
            return;
        } 
        var auto_slide_pre_time = 5000;
        var delay_time = 200;
        var delay_id = null;
        var delay = function(fun, time, param) {
            clearTimeout(delay_id);
            delay_id = setTimeout(function() {
                fun(param);
            }, time);
        }
        var slide_image_by_index = function(index) {
            var cur_index = parseInt(btns.filter('.on').attr('data-index'), 10);
            if (cur_index === index) {
                return;
            }
            image_list.each(function(i) {
                if (i !== index) {
                    $(this).fadeOut();
                }
            })
            image_list.eq(index).fadeIn();
            btns.removeClass('on');
            btns.eq(index).addClass('on');
        }
        var auto_slide = function() {
            var index = parseInt(btns.filter('.on').attr('data-index'), 10);
            delay(auto_slide, auto_slide_pre_time, (index + 1) % sum);
            slide_image_by_index((index + 1) % sum);
        }
        delay(auto_slide, auto_slide_pre_time, 0);
        btns.hover(function() {
            var index = parseInt($(this).attr('data-index'), 10);
            delay(slide_image_by_index, delay_time, index);
        }, function() {
            delay(auto_slide, auto_slide_pre_time);
        });
    }
});

$(document).ready(function () {
    mouseAct(".news-title a", ".news-box", "now-news");
    mouseAct(".floor-title li", ".floor", "on-select");
    function mouseAct(ele, p_class, s_class) {
        $("body").on("mouseenter", ele, function () {
            var _this = $(this), _class = _this.attr("data-boxClass"), _box = _this.parents(p_class).find(_class);
            if (_this.hasClass(s_class) == false) {
                setTimeout(function () {
                    _this.addClass(s_class);
                    _this.siblings().removeClass(s_class);
                    _box.removeClass("dn");
                    _box.siblings().addClass("dn");
                }, 300);
            }
        });
    }

    //¹ã¸æÂÖ·¬
    var s_width = 280;
    var dl_len = $('.slidesContainer li').length;
    var now_index = 0;
    var max_num = dl_len - 1;

    function play() {
        if (now_index < max_num) {
            now_index++;
            $('.slidesContainer').animate({ left: -s_width * now_index }, "slow");
        }
        else {
            now_index = 0;
            $('.slidesContainer').animate({ left: 0 }, "slow");
        };
    }

    function playleft() {
        if (now_index > 0) {
            now_index = now_index - 1;
            $('.slidesContainer').animate({ left: -s_width * now_index }, "slow");
        };
    }

    var mytime;
    function resetTime() {
        mytime = setInterval(play, 3000);
    }
    resetTime();
    function clearTime() {
        clearInterval(mytime);
    }

    $("#rightbtn").bind('click', play).bind('mouseover', clearTime).bind('mouseout', resetTime);
    $("#leftbtn").bind('click', playleft).bind('mouseover', clearTime).bind('mouseout', resetTime);



    //µ×²¿¹¥ÂÔ
    $(".floor4").on("mouseenter", ".gonglv a", function () {
        var nodeH = $(this).find("p").eq(1).height() + 50;
        $(this).find("div").animate({ "height": nodeH }, 500);
    }).on("mouseleave", ".gonglv a", function () {
        $(this).find("div").animate({ "height": 36 }, 200);
    });
});
