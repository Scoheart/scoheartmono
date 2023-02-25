import Vue from "@scoheart/vue"
import axios from '@scoheart/axios'
let vm = new Vue({
    el: "#app",
    data: {
        name: "shuhao",
        age: 23
    }
})

console.log(vm)

// axios({
//     method: "get",
//     url: "http://localhost:8080/get"
// }).then(res => {
//     vm.data = res
//     console.log(res);
// })