// ==UserScript==
// @namespace    https://github.com/KhanhhNe
// @name         Auto buy forest-berries
// @description  Auto trade chợ đen forest-berries
// @icon         https://www.google.com/s2/favicons?domain=forest-berries.biz
// @copyright    2021, KhanhhNe (https://github.com/KhanhhNe)
// @license      CC-BY-SA-3.0; http://creativecommons.org/licenses/by-sa/3.0/
// @license      MIT
// @version      1.2.0
// @include      https://forest-berries.biz/account/market
// @grant        none
// ==/UserScript==

// ==OpenUserJS==
// @author       KhanhhNe
// ==/OpenUserJS==

/*jshint esversion: 6 */
/*jshint asi: true */
/*globals $:false */

!function () {
    'use strict';

    const data = {"\u0442\u0440\u0438": 3, "\u0447\u0435\u0442\u044b\u0440\u0435": 4, "\u043f\u044f\u0442\u044c": 5, "\u0448\u0435\u0441\u0442\u044c": 6, "\u0441\u0435\u043c\u044c": 7, "\u0432\u043e\u0441\u0435\u043c\u044c": 8, "\u0434\u0435\u0432\u044f\u0442\u044c": 9, "\u0434\u0435\u0441\u044f\u0442\u044c": 10, "\u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 11, "\u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 12, "\u0442\u0440\u0438\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 13, "\u0447\u0435\u0442\u044b\u0440\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 14, "\u043f\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 15, "\u0448\u0435\u0441\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 16, "\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 17, "\u0432\u043e\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 18, "\u0434\u0435\u0432\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c": 19, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c": 20, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0442\u0440\u0438": 23, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0447\u0435\u0442\u044b\u0440\u0435": 24, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u043f\u044f\u0442\u044c": 25, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0448\u0435\u0441\u0442\u044c": 26, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0441\u0435\u043c\u044c": 27, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0432\u043e\u0441\u0435\u043c\u044c": 28, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0434\u0435\u0432\u044f\u0442\u044c": 29, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c": 30, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0442\u0440\u0438": 33, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0447\u0435\u0442\u044b\u0440\u0435": 34, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u043f\u044f\u0442\u044c": 35, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0448\u0435\u0441\u0442\u044c": 36, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0441\u0435\u043c\u044c": 37, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0432\u043e\u0441\u0435\u043c\u044c": 38, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0434\u0435\u0432\u044f\u0442\u044c": 39, "\u0441\u043e\u0440\u043e\u043a": 40, "\u0441\u043e\u0440\u043e\u043a \u0442\u0440\u0438": 43, "\u0441\u043e\u0440\u043e\u043a \u0447\u0435\u0442\u044b\u0440\u0435": 44, "\u0441\u043e\u0440\u043e\u043a \u043f\u044f\u0442\u044c": 45, "\u0441\u043e\u0440\u043e\u043a \u0448\u0435\u0441\u0442\u044c": 46, "\u0441\u043e\u0440\u043e\u043a \u0441\u0435\u043c\u044c": 47, "\u0441\u043e\u0440\u043e\u043a \u0432\u043e\u0441\u0435\u043c\u044c": 48, "\u0441\u043e\u0440\u043e\u043a \u0434\u0435\u0432\u044f\u0442\u044c": 49, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442": 50, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0442\u0440\u0438": 53, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0447\u0435\u0442\u044b\u0440\u0435": 54, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043f\u044f\u0442\u044c": 55, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0448\u0435\u0441\u0442\u044c": 56, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0441\u0435\u043c\u044c": 57, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0432\u043e\u0441\u0435\u043c\u044c": 58, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0435\u0432\u044f\u0442\u044c": 59, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442": 60, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0442\u0440\u0438": 63, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0447\u0435\u0442\u044b\u0440\u0435": 64, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043f\u044f\u0442\u044c": 65, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0448\u0435\u0441\u0442\u044c": 66, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0441\u0435\u043c\u044c": 67, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0432\u043e\u0441\u0435\u043c\u044c": 68, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0435\u0432\u044f\u0442\u044c": 69, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442": 70, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0442\u0440\u0438": 73, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0447\u0435\u0442\u044b\u0440\u0435": 74, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043f\u044f\u0442\u044c": 75, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0448\u0435\u0441\u0442\u044c": 76, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0441\u0435\u043c\u044c": 77, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0432\u043e\u0441\u0435\u043c\u044c": 78, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0435\u0432\u044f\u0442\u044c": 79, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442": 80, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0442\u0440\u0438": 83, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0447\u0435\u0442\u044b\u0440\u0435": 84, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043f\u044f\u0442\u044c": 85, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0448\u0435\u0441\u0442\u044c": 86, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0441\u0435\u043c\u044c": 87, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0432\u043e\u0441\u0435\u043c\u044c": 88, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0435\u0432\u044f\u0442\u044c": 89, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e": 90, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0442\u0440\u0438": 93, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0447\u0435\u0442\u044b\u0440\u0435": 94, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u043f\u044f\u0442\u044c": 95, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0448\u0435\u0441\u0442\u044c": 96, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0441\u0435\u043c\u044c": 97, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0432\u043e\u0441\u0435\u043c\u044c": 98, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0434\u0435\u0432\u044f\u0442\u044c": 99, "\u0441\u0442\u043e": 100, "\u043d\u0443\u043b\u044c": 0, "\u043d\u043e\u043b\u044c": 0, "\u043e\u0434\u0438\u043d": 1, "\u043e\u0434\u043d\u0430": 1, "\u043e\u0434\u043d\u043e": 1, "\u043e\u0434\u043d\u0438": 1, "\u0434\u0432\u0430": 2, "\u0434\u0432\u0435": 2, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u043e\u0434\u0438\u043d": 21, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u043e\u0434\u043d\u0430": 21, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u043e\u0434\u043d\u043e": 21, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0434\u0432\u0430": 22, "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c \u0434\u0432\u0435": 22, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u043e\u0434\u0438\u043d": 31, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u043e\u0434\u043d\u0430": 31, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u043e\u0434\u043d\u043e": 31, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0434\u0432\u0430": 32, "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c \u0434\u0432\u0435": 32, "\u0441\u043e\u0440\u043e\u043a \u043e\u0434\u0438\u043d": 41, "\u0441\u043e\u0440\u043e\u043a \u043e\u0434\u043d\u0430": 41, "\u0441\u043e\u0440\u043e\u043a \u043e\u0434\u043d\u043e": 41, "\u0441\u043e\u0440\u043e\u043a \u0434\u0432\u0430": 42, "\u0441\u043e\u0440\u043e\u043a \u0434\u0432\u0435": 42, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u0438\u043d": 51, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u0430": 51, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u043e": 51, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0430": 52, "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0435": 52, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u0438\u043d": 61, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u0430": 61, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u043e": 61, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0430": 62, "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0435": 62, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u0438\u043d": 71, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u0430": 71, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u043e": 71, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0430": 72, "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0435": 72, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u0438\u043d": 81, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u0430": 81, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u043e\u0434\u043d\u043e": 81, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0430": 82, "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442 \u0434\u0432\u0435": 82, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u043e\u0434\u0438\u043d": 91, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u043e\u0434\u043d\u0430": 91, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u043e\u0434\u043d\u043e": 91, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0434\u0432\u0430": 92, "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e \u0434\u0432\u0435": 92}

    function range(a, b=-1) {
        if (b == -1) {
            return [...Array(a)].map((_, index) => index)
        } else {
            return [...Array(b-a)].map((_, index) => index + a)
        }
    }

    function match_percent(input, source) {
        const dp = [
            [...Array(input.length)].map((_, index) => input[index] == source[0] ? 1 : 0)
        ]

        for (let source_ind of range(1, source.length)) {
            dp.push([...Array(input.length)].map(n => n || 0))
            if (input[0] == source[source_ind] || dp[source_ind-1][0] == 1) {
                dp[source_ind][0] = 1
            } else {
                dp[source_ind][0] = 0
            }
        }

        for (let source_ind of range(1, source.length)) {
            for (let input_ind of range(1, input.length)) {
                dp[source_ind][input_ind] = input[input_ind] == source[source_ind] ? 1 : 0
                dp[source_ind][input_ind] += Math.max(...dp[source_ind-1].slice(0, input_ind))
            }
        }

        return dp[source.length-1][input.length-1]
    }

    function get_value(input) {
        let max_length = -1, match_number = -1, match_russian = ''

        for (let [russian, number] of Object.entries(data)) {
            let current_match_length = match_percent(input, russian)

            // Lưu lại <chữ tiếng Nga>, <số kí tự trùng nhau với input>
            // nếu <số kí tự trùng nhau với input> > <số kí tự trùng nhau tối đa hiện tại>
            if (current_match_length > max_length) {
                max_length = current_match_length
                match_number = number
                match_russian = russian
            }
        }
        // Hiển thị nhìn cho zui
        console.log({input, match_russian, match_number, max_length})
        return match_number
    }

    function solve(text) {
        const [a, b] = text.split(' + ')
        return get_value(a) + get_value(b)
    }

    function has_captcha() {
        // Phát hiện captcha dựa trên hình ảnh cô cảnh sát xinh đẹp
        return document.querySelector('img[src*="polic.png"]') !== null
    }

    function solve_captcha() {
        // Lấy nội dung captcha
        const captcha_text = document.querySelector('.cl-right > div > center span span').textContent.split(' = ')[0]
        // Giải captcha
        const captcha_solution = solve(captcha_text)
        if (document.forms.length < 3) {
            // Nếu không có form thì có nghĩa là captcha đang bị khoá
            // và phải đợi để được giải captcha
            window.location.reload()
        } else {
            // Nhập dữ liệu đáp án captcha vào field n99 và submit (tự reload)
            document.forms[2].n99.value = captcha_solution
            document.forms[2].submit()
        }
    }

    function buy_stuff() {
        let requested = 0
        for (let inp of document.querySelectorAll('.tdata3 [name=item]')) {  // Chọn các input có name là "item"
            const form = new FormData(document.forms[0])  // Tạo form data để submit
            form.set('item', inp.value)  // Đặt item thành giá trị của input

            // Submit form
            $.ajax({
                url: form.action,
                data: form,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(){}
            })
            requested += 1
        }
        document.querySelector('.blokkur5k').scrollIntoView()  // Scroll đến bảng slot để dễ nhìn
        setTimeout(() => window.location.reload(), requested * 1000)  // Reload trang để xem kết quả
    }

    // Tự reload trong trường hợp code chính không reload được vì gặp lỗi (ưu tiên)
    setTimeout(() => window.location.reload(), 10000)
    // Reload bằng cách chuyển đến link hiện tại (dự phòng). Sở dĩ cách này 
    // chỉ là dự phòng vì làm thế liên tục sẽ làm browser lag hơn khi lịch sử
    // sẽ tràn ngập /account/market, /account/market,...
    setTimeout(() => window.location.replace(window.location.href), 15000)

    if (has_captcha()) {
        solve_captcha()
    } else {
        buy_stuff()
    }
}() // jshint ignore:line
