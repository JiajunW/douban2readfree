// ==UserScript==
// @name        豆瓣 ReadFree 传送门
// @namespace   https://github.com/JiajunW/douban2readfree
// @description 在“豆瓣读书”页面增加到ReadFree电子书的传送门
// @icon        https://raw.githubusercontent.com/JiajunW/douban2readfree/master/res/icon.png
// @include     https://book.douban.com/subject/*
// @version     1.0.2
// @resource    custom_css https://raw.githubusercontent.com/JiajunW/douban2readfree/master/style/style.css
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceText
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
        GM_addStyle(GM_getResourceText("custom_css"));
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
        method: "HEAD",
        url: rf_url,
        onload: function(response) {
            if (response.status == 200) {
                var panel = dom('div', { id : 'readfree-link' }),
                    ahref = dom('a', { href : rf_url, target : '_blank' }, 'ReadFree!')
                panel.appendChild(ahref);
                document.body.appendChild(panel);

                add_readfree_style();
            }
        }
    });
})();
