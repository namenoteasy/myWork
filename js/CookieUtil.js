//CookieUtil命名空间
var CookieUtil = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",            //先把name编码，因为cookie的name和value是编码过的
            cookieStart = document.cookie.indexOf(cookieName),    //
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;              //如果后面没有分号，说明该cookie是字符串最后一个
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName,length, cookieEnd));
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);      //把value设成空字符串，初始化失效时间为0，确保删除cookie
    }

}