import axios from '@scoheart/axios'

axios({
    method: "get",
    url: "http://localhost/get"
}).then(v => {
    console.log(v)
})