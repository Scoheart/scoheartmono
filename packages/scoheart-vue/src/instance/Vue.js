import { initMixin } from "./init"

export function Vue(options) {
    this._init(options)
}

initMixin(Vue)
