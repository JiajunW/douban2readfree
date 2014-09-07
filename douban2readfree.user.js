// ==UserScript==
// @name        豆瓣 ReadFree 传送门
// @namespace   https://github.com/JiajunW/douban2readfree
// @description 在“豆瓣读书”页面增加到ReadFree电子书的传送门
// @icon        https://raw.githubusercontent.com/JiajunW/douban2readfree/master/res/icon.png
// @include     http://book.douban.com/subject/*
// @version     1.0.0
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    function get_book_id() {
        var path = document.location.pathname;
        var re = /^\/subject\/(\d+)/g;
        var matches = re.exec(path);
        if (matches && matches.length > 1) {
            return parseInt(matches[1]);
        }
    }

    function add_readfree_style() {
        var custom_css = "\
          #readfree-link {\
            position: fixed;\
            top: 160px;\
            left: -10px;\
            padding: 10px 20px 10px 30px;\
            border-radius: 10px;\
            background: -webkit-linear-gradient(top, rgba(50, 74, 105, 0.8), rgba(50, 74, 105, 1));\
            background:   -mozc-linear-gradient(top, rgba(50, 74, 105, 0.8), rgba(50, 74, 105, 1));\
            background:         linear-gradient(to bottom, rgba(50, 74, 105, 0.8), rgba(50, 74, 105, 1));\
          }\
        \
          #readfree-link > a {\
            color: white;\
          }\
        ";
        GM_addStyle(custom_css);
    }

    function dom(tag, attr, inner) {
        var tag = document.createElement(tag);
        for (var key in attr) {
            if (attr.hasOwnProperty(key)) {
                tag.setAttribute(key,attr[key]);
            }
        }
        if (inner) {
            tag.innerHTML = inner;
        }
        return tag;
    }

    var id = get_book_id();
    if (id === undefined) {
        return;
    }

    var rf_url = 'http://readfree.me/book/' + id;

    GM_xmlhttpRequest({
        method: "GET",
        url: rf_url,
        onload: function(response) {
            if (response.readyState == 4 && response.status == 200) {
                add_readfree_style();
                var panel = dom('div', { id : 'readfree-link' }),
                    ahref = dom('a', { href : rf_url, target : '_blank' }, 'ReadFree!')
                panel.appendChild(ahref);
                document.body.appendChild(panel);
            }
        }
    });
})();
