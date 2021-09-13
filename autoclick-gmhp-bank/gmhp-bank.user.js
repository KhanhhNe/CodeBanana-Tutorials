// ==UserScript==
// @namespace    https://github.com/KhanhhNe
// @name         GMHP-Bonus
// @description  Click bonus 6h, 20h, 24h tự động của gmhp-bank.xyz
// @icon         https://www.google.com/s2/favicons?domain=gmhp-bank.xyz
// @copyright    2021, KhanhhNe (https://github.com/KhanhhNe)
// @license      CC-BY-SA-3.0; http://creativecommons.org/licenses/by-sa/3.0/
// @license      MIT
// @version      1.0.0
// @include      https://gmhp-bank.xyz/bonus_gift*
// @grant        none
// ==/UserScript==

// ==OpenUserJS==
// @author       KhanhhNe
// ==/OpenUserJS==


/*jshint esversion: 9 */
/*jshint asi: true */


/**
 * Lấy bonus từ URL /bonus_gift_<number>/
 * @returns Số thứ tự bonus hiện tại
 */
function currentBonus() {
    return parseInt(location.href.match(/bonus_gift_(\d)/)[1])
}


/**
 * Lấy số thứ tự bous tiếp theo của currentBonus() (1 -> 2 -> 3 -> 1 -> ...)
 * @returns Số thứ tự bonus tiếp theo
 */
function nextBonus() {
    return currentBonus() % 3 + 1
}


/**
 * Chuyển hướng sang URL của bonus tiếp theo
 */
function gotoNextBonus() {
    location.replace(`https://gmhp-bank.xyz/bonus_gift_${nextBonus()}/`)
}


(function main() {
    // Chuyển sang bonus tiếp theo nếu bonus hiện tại chưa hết thời gian chờ
    if (document.querySelector('#timer_word_id')) {
        console.log(`Bonus ${currentBonus()} đã nhận từ trước. Đang chuyển hướng đến bonus tiếp theo...`);
        setTimeout(gotoNextBonus, 30000)
        return
    }

    // Chạy hàm onclick của banner (nhưng không click để tránh bị redirect, mở tab mới,...)
    const banner = document.querySelector(`.bonus_gift_${currentBonus()}_banner_2 a`)
    if (banner !== null) {
        console.log(`Đã click banner của bonus ${currentBonus()}!`);
        eval(banner.getAttribute('onclick'))
    }

    // Nhấn 'Receive'
    setInterval(() => document.querySelector(`#bonus_gift_${currentBonus()}_button`).click(), 5000)
    console.log(`Đã nhận bonus ${currentBonus()}!`);
})();