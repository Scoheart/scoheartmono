import Axios from './core/Axios.js'
import defaults from './defaults/index.js'

function createInstance(defaultConfig) {

    let context = new Axios(defaultConfig)

    //将instance this 指向 context（Axios构造函数的实例对象）
    let instance = Axios.prototype.request.bind(context)

    // 将Axios构造函数的实例 context身上的属性 copy 到 instance函数上
    // axios.default  axios.interpceptor
    Object.keys(context).forEach((item) => {
        instance[item] = context[item]
    })

    // 将实例Axios原型 身上的方法 copy 到 instance函数上
    // axios.get() axios.post()....
    Object.keys(Axios.prototype).forEach((item) => {
        instance[item] = Axios.prototype[item]
    })

    return instance
}

let axios = createInstance(defaults)

export default axios
