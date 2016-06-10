/**
 * Created by lu on 2016/6/2.
 */
$(document).ready(function(){
    $(".mnav-3, .bdbri").hover(
        function(){
        $(".bdbri").attr("style","display:block");
    },
        function () {
            $(".bdbri").attr("style","display:none");
        }
    );
    $(".mnav-set, #setting-menu").hover(
        function(){
            $("#setting-menu").attr("style","display:block");
        },
        function(){
            $("#setting-menu").attr("style","display:none");
        }
    );
    $(".mnav-login").click(
        function () {
            $("#login-pop-wr,#mask-layer").css("display","block");
        }
    );
    $(".close-btn-wr").click(
        function () {
            $("#login-pop-wr,#mask-layer").css("display","none");
            $("#login-pop-wr").css({"top":"50%","left":"50%","margin-left":"-196.6px","margin-top":"-217.5px"});
        }
    );
    $(".input-box").click(
        function () {
            $(".suggest").css("display","block");
        }
    );
    $(".input-box").focus(function () {
        $("span.s-input-wrapper").css("border-color","#4791ff transparent #4791ff  #4791ff");
    });
    $(".input-box").blur(
        function () {
            $(".suggest").css("display","none");
            $("span.s-input-wrapper").css("border-color","#b6b6b6");
        }
    );
    $(".soutu-btn").click(function (ev) {
        $(".soutu-layer").css("display","block");
        ev.stopPropagation();
    });
    $(".soutu-close-btn").click(
        function () {
            $(".soutu-layer").css("display","none");
        }
    );
  $(".soutu-layer").mouseleave(function () {
      $(document).click(function () {
          $(".soutu-layer").css("display","none");
      })
  });
    toDrag("pop-head","login-pop-wr");
});