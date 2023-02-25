import { initState } from "./state"

export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        // this = new Vue()
        this.$options = options
        initState(this)
    }
}





