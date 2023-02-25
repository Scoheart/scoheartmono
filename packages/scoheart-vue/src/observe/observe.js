import { Dep } from "./dep";

class Observer {
    constructor(value) {
        this.walk(value);
    }
    walk(data) {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            defineReactive(data, key, value);
        }
    }
}

// 数据劫持
function defineReactive(data, key, value) {

    observe(value); 

    let dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            // console.log("you getter", key)
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return value;
        },
        set(newValue) {
            // console.log("you setter", key)
            if (newValue === value) return;
            value = newValue;
            // 劫持新赋值
            observe(value)
            dep.notify()
        },
    });

}

export function observe(value) {
    if (
        Object.prototype.toString.call(value) === "[object Object]"
    ) {
        return new Observer(value);
    }
}