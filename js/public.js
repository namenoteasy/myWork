$(document).ready(function () {
    //ÊäÈë¿ò
    var _input = $("input[data-placeholder]");
    for (var i = 0; i < _input.length; i++) {
        if (_input.eq(i).val() == "") {
            _input.eq(i).val(_input.eq(i).attr("data-placeholder"));
        }
    }
    $("form").on("focus", "input[data-placeholder]", function () {
        var placeholder = $(this).attr("data-placeholder");
        if ($(this).val() == placeholder) {
            $(this).val("");
        }
    }).on("blur", "input[data-placeholder]", function () {
        var placeholder = $(this).attr("data-placeholder");
        if ($(this).val() == "") {
            $(this).val(placeholder);
        }
    });

    //·ÖÀà
    $("body").on("mouseenter", ".fenlei_title", function () {
        if ($(this).hasClass("js_index") == true) {
            return false;
        }
        else {
            $(this).addClass("open");
        }
    }).on("mouseleave", ".fenlei_title", function () {
        if ($(this).hasClass("js_index") == true) {
            return false;
        }
        else {
            $(this).removeClass("open");
        }
    });
});