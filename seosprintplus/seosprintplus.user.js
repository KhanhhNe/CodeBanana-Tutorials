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
const int = setInterval(() => localStorage.setItem('employersData', JSON.stringify(data)), 1000)
// Ngưng update dữ liệu sau 20s vì không còn dữ liệu mới nữa (đã crawl đầy đủ)
setTimeout(() => clearInterval(int), 20000)


/*
 * Lấy thông tin employer từ seosprint (/member, /employer-tasks)
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
    return (await Promise.all([getActiveTasksCount, getMemberInfo])).reduce((a, b) => Object.assign(a, b), {})
}


/*
 * Wrapper để cache dữ liệu employer và quản lí việc gọi hàm getEmployerInfo tối ưu thời gian nhất
 */
async function getEmployerCached(employerId) {
    if (!data[employerId]) {
        // Lấy dữ liệu về employer nếu không có sẵn trong data
        data[employerId] = {
            ...await getEmployerInfo(employerId)
        }
        console.log(`Got ${employerId}`)
    } else {
        // Trả về dữ liệu đã lưu trước đó trong data
        console.log(`Cached ${employerId}`)
        getEmployerInfo(employerId).then(employerData => {
            // Chạy task update employerData trong background
            data[employerId] = {
                ...employerData
            }
            console.log(`Updated ${employerId}`)
        })
    }
    return data[employerId]
}


(function() {
    'use strict';
    const init = {}

    for (const adv of document.querySelectorAll('.adv-line')) {
        // Lấy ID employer
        const employerId = adv.querySelector('a.ref-block-av').href.match(/\d+/g)[0]
        const employerClass = `employer-${employerId}-tasks`

        // Thêm element hiển thị thông tin tasks của employer
        const template = document.createElement('template')
        template.innerHTML = `<span style="white-space: nowrap" translate="no" class="${employerClass}">
            <b class="active-tasks" title="Active tasks" style="color: green; font-size: 1.25rem"></b>
            <span>/</span>
            <b class="total-tasks" title="Total tasks" style=""></b>
        </span>`
        adv.querySelector('.adv-line-cell-1').append(template.content.firstChild)

        // Thêm element hiển thị thông tin member của employer
        template.innerHTML = `<span style="margin-right: 14px" translate="no" class="${employerClass}">
            <span class="member-info"></span>
        </span>`
        adv.querySelector('.advmoder > div > span:first-child').prepend(template.content.firstChild)

        if (!init[employerId]) {
            // Chỉ chạy task getEmployerCached nếu employerId chưa khởi tạo (chỉ chạy 1 lần duy nhất)
            getEmployerCached(employerId).then(employerData => {
                // Update thông tin trong web bằng dữ liệu lấy được
                for (const elem of document.querySelectorAll(`.${employerClass} .active-tasks`)) {
                    elem.innerHTML = employerData.active_tasks
                }
                for (const elem of document.querySelectorAll(`.${employerClass} .total-tasks`)) {
                    elem.innerHTML = employerData.total_tasks
                }
                for (const elem of document.querySelectorAll(`.${employerClass} .member-info`)) {
                    elem.innerHTML = `${employerData.name} ${employerData.id}`
                }
            })
            init[employerId] = true
        }
    }
})();