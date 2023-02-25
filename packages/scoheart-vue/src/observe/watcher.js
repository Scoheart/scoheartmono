import { Dep } from "./dep"

export class Watcher{
    constructor(vm, data, callback) {
        this.vm = vm
        this.data = data
        this.callback = callback

        Dep.target = this
        data.split(".").reduce((newObj, k)=>{
            return newObj[k]
        }, vm)
        Dep.target = null
    }

    update() {
        let value = this.data.split(".").reduce((newObj, k)=>{
            return newObj[k]
        }, this.vm)
        this.callback(value)
    }
}