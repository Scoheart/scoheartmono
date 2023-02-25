import Vue from "@scoheart/vue"
import axios from '@scoheart/axios'

let vm = new Vue({
    el: "#app",
    data: {
        basic: {
            name: "shuhao",
            age: 12,
            gender: "male",
            addr: "",
            email: "s",
            tel: "ds"
        },
        education: {
            school: "sd"
        }
    }
})

console.log(vm)
// vm.basic.name = {
//     name: "shuhao",
//     age: 23
// }



axios({
    method: "get",
    url: "http://localhost:8080/get"
}).then(res => {
    vm.basic = res
})

