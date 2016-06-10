//子cookie对象
var SubCookieUtil = {
    get: function (name, subname) {                   //调用自己getAll方法
        var subCookies = this.getAll(name);
        if (subCookies) {
            return subCookies[subname];
        } else {
            return null;
        }
    },
    //得到所有子cookie
    getAll: function (name) {
        var cookieName=encodeURIComponent(name)+"=",            //先把name编码
            cookieStart=document.cookie.indexOf(cookieName),       
            cookieValue=null,
            cookieEnd,
            subCookies,
            i
        parts,
        result = {};
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;               //如果不存在分号，说明是最后一个cookie
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
            if (cookieValue.length > 0) {
                subCookies = cookieValue.split("&");               //分割子cookie
                for (i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split("=");                  //子cookie分割成两部分
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);           //保存在对象中
                }
                return result;
            }
        }
        return null;
    },
    //
    set: function (name, subname, value,expires, path, domain, secure) {
        var subcookies = this.getAll(name) || {};
        subcookies[subname] = value;                //设置对象单个属性
        this.setAll(name, subcookies, expires, path, domain, secure);   //再调用setAll
    },
    //
    setAll: function (name, subcookies, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=",
            subcookieParts = new Array(),
            subName;
        for (subName in subcookies) {             
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {         //值和名字不为空
                subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
            }
        }
        if (subcookieParts.length > 0) {
            cookieText += subcookieParts.join("&");        //数组以&连接成字符串
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
            
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString(); //如果子cookie为空，删除cookie
        }
        document.cookie = cookieText;
    },
    unset: function (name, subname,  path, domain, secure) {
        var subcookies = this.getAll(name);
        if (subcookies) {
            delete subcookies[subname];               //删除单个属性
            this.setAll(name, subcookies, null, path, domain, secure);   //再调用setAll
        }
    },
    unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure)
    }
}

