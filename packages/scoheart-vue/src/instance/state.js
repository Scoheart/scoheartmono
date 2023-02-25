import { observe } from "../observe/observe"
import { Watcher } from "../observe/watcher"
import { proxy } from "./proxy"

export function initState(vm) {
    if (vm.$options.data) {
        initData(vm)
    }
    if (vm.$options.el) {
        initTemplate(vm)
    }
}

// init data
function initData(vm) {
    let data = vm.$options.data
    vm._data = data

    for (const key in vm._data) {
        // 数据代理
        proxy(vm, "_data", key)
    }

    // 响应式绑定
    observe(vm._data)
}


function initTemplate(vm) {
    let el = vm.$options.el
    const fragment = document.createDocumentFragment()
    let app = document.querySelector(el)
    let childNode
    while ((childNode = app.firstChild)) {
        fragment.appendChild(childNode)
    }

    regEx(fragment)

    app.appendChild(fragment)

    function regEx(node) {

        const RegEx = /\{\{\s*(\S+)\s*\}\}/

        if (node.nodeType === 3) {
            const text = node.textContent
            const execResult = RegEx.exec(text)
            // execResult[0] = {{xxx.xxx}}   execResult[1] = xxx.xxx
            if (execResult) {
                let value = execResult[1].split(".").reduce((newObj, k) => {
                    return newObj[k]
                }, vm)
                node.textContent = text.replace(execResult[0], value)
                new Watcher(vm, execResult[1], function (newValue) {
                    node.textContent = text.replace(execResult[0], newValue)
                })
            }
            return
        }

        node.childNodes.forEach(cn => regEx(cn));
    }
}


