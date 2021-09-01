// ==UserScript==
// @namespace    https://github.com/KhanhhNe
// @name         SeosprintPlus
// @description  Chiến Seosprint siêu đỉnh cùng KhanhhNe và MMO4Me
// @icon         https://github.com/KhanhhNe/CodeBanana-Tutorials/raw/main/seosprintplus/logo.png
// @copyright    2021, KhanhhNe (https://github.com/KhanhhNe)
// @license      CC-BY-SA-3.0; http://creativecommons.org/licenses/by-sa/3.0/
// @license      MIT
// @version      1.0.0
// @include      https://seosprint.net/earn*
// @grant        none
// ==/UserScript==

// ==OpenUserJS==
// @author       KhanhhNe
// ==/OpenUserJS==


/*jshint esversion: 9 */
/*jshint asi: true */


let data;
// Lấy dữ liệu từ localStorage
try {
    data = JSON.parse(localStorage.getItem('employersData')) || {}
} catch (e) {
    data = {}
}

// Update liên tục dữ liệu data lên localStorage
const int = setInterval(
    () => localStorage.setItem('employersData', JSON.stringify(data)), 1000
)
// Ngưng update dữ liệu sau 20s vì không còn dữ liệu mới nữa (đã crawl đầy đủ)
setTimeout(() => clearInterval(int), 20000)


const getEmployerClass = employerId => `employer-${employerId}-tasks`


/**
/**
 * Lấy thông tin employer từ seosprint (/member, /employer-tasks)
 * @param {String} employerId
 * @returns Dữ liệu employer
 */
async function getEmployerInfo(employerId) {
    // Lấy tổng số tasks, thông tin member của employer
    const getMemberInfo = new Promise(async function (resolve, reject) {
        const response = await fetch(`/member/${employerId}`)
        const body = await response.text()
        const doc = (new DOMParser()).parseFromString(body, 'text/html')
        resolve({
            name: doc.querySelector('.mem-title').textContent,
            id: doc.querySelector('.nick').textContent,
            total_tasks: parseInt(doc.querySelector('a.mem-box').textContent) || 0
        })
    })
    // Lấy số tasks đang active
    const getActiveTasksCount = new Promise(async function (resolve, reject) {
        const response = await fetch(`/employer-tasks/${employerId}`)
        const body = await response.text()
        const doc = (new DOMParser()).parseFromString(body, 'text/html')
        resolve({
            active_tasks: doc.querySelectorAll('.adv-line').length
        })
    })
    // Dùng Promise.all để chạy cả 2 task cùng lúc
    return (await Promise.all([getActiveTasksCount, getMemberInfo]))
        .reduce((a, b) => Object.assign(a, b), {})
}


/**
 * Trả về dữ liệu có sẵn trong cache nếu có hoặc dữ liệu vừa crawl và chạy task
 * crawl dữ liệu mới trong background
 * @param {String} employerId
 * @returns Dữ liệu employer
 */
async function getEmployerCached(employerId) {
    if (!data[employerId]) {
        // Lấy dữ liệu về employer nếu không có sẵn trong data
        data[employerId] = {
            ...await getEmployerInfo(employerId)
        }
        console.log(`Got ${employerId}`)
    } else {
        // Chạy task update employerData trong background
        getEmployerInfo(employerId).then(employerData => {
            data[employerId] = {
                ...employerData
            }
            console.log(`Updated ${employerId}`)
        })
    }
    return data[employerId]
}


/**
 * Crawl và hiển thị thông tin employer
 * @param {Element} adv Advertisement element
 * @param {String} employerId
 * @param {Boolean} crawl Chạy task crawl dữ liệu hay không (mặc định: false)
 */
function addEmployerInfo(adv, employerId, crawl = false) {
    // Thêm element hiển thị thông tin tasks của employer
    const template = document.createElement('template')
    template.innerHTML =
        `<div style="white-space: nowrap; width: 4rem;" translate="no">
            <b class="active-tasks" title="Active tasks" style="color: green; font-size: 1.25rem"></b>
            <span>/</span>
            <b class="total-tasks" title="Total tasks" style=""></b>
        </span>`
    adv.querySelector('.adv-line-cell-1').append(template.content.firstChild)

    // Thêm element hiển thị thông tin member của employer
    template.innerHTML =
        `<span style="margin-right: 14px" translate="no">
            <span class="member-info"></span>
        </span>`
    adv.querySelector('.advmoder > div > span:first-child').prepend(template.content.firstChild)

    if (crawl) {
        // Crawl thông tin và cập nhật vào web
        getEmployerCached(employerId).then(employerData => { // jshint ignore:line
            document.querySelectorAll(`.${getEmployerClass(employerId)}`).forEach(adv => {
                adv.querySelector('.active-tasks').innerHTML = employerData.active_tasks
                adv.querySelector('.total-tasks').innerHTML = employerData.total_tasks
                adv.querySelector('.member-info').innerHTML = `${employerData.name} ${employerData.id}`
            })
        })
    }
}


/**
 * Chèn nút block employer vào mỗi ô job
 * @param {Element} adv 
 * @param {String} employerId 
 */
function addEmployerBlockBtn(adv, employerId) {
    const favourite = adv.querySelector('[id*=task_fav]')

    const template = document.createElement('template')
    const onclick = `linkSubmit('work_mode=fast&job=18&win=3&iduser=${employerId}', true);`
    template.innerHTML =
        `<div onclick="${onclick}" style="${favourite.getAttribute('style')}" title="Block" translate="no">
            <i class="fas fa-skull" style="color: rgb(189, 195, 199);"></i>
        </div>`
    const block = template.content.firstChild

    favourite.outerHTML =
        `<div style="display: flex; justify-content: space-between; align-items: flex-end;">
            ${favourite.outerHTML}
            ${block.outerHTML}
        </div>`
}


/**
 * Xoá thanh Blog ở bên phải, nhường chỗ cho list job
 */
function removeBlogBar() {
    document.getElementById('block-sideright').remove()
}


(function main() {
    'use strict';
    removeBlogBar();

    const init = {} // Lưu thông tin employer đã khởi tạo (chạy task crawl) hay chưa

    for (const adv of document.querySelectorAll('.adv-line')) {
        // Lấy ID employer
        const employerId = adv.querySelector('a.ref-block-av').href.match(/\d+/g)[0]
        const employerClass = getEmployerClass(employerId)
        adv.classList.add(employerClass)

        addEmployerInfo(adv, employerId, !init[employerId])
        addEmployerBlockBtn(adv, employerId)
        init[employerId] = true
    }
})();