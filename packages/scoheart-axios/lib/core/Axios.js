import dispatchAdapter from './dispatchAdapter.js'
function Axios(defaultConfig) {
    this.defaults = defaultConfig
    this.interceptor = {
        request: {},
        response: {}
    }
}

Axios.prototype.request = function (config) {

    let promise = Promise.resolve(config)

    let chains = [dispatchAdapter, undefined]

    let result = promise.then(chains[0], chains[1])

    return result
}

Axios.prototype.get = function () {
    console.log("get method")
}

Axios.prototype.post = () => {
    console.log("post method")
}

// class Axios {
//     constructor(defaultConfig) {
//         this.default = defaultConfig
//         this.interceptor = {
//             request: {},
//             response: {}
//         }
//     }

//     request() {
//         console.log(this)
//     }
//     get() {
//         console.log(this)
//     }
//     post() {
//         console.log(this)
//     }
// }

export default Axios

