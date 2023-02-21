
export default function (obj) {

    return new Promise((resolve, reject) => {

        const response = {
            status: "",
            data: ""
        }

        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status >= 200 && ajax.status < 400) {
                    response.status = ajax.status
                    response.data = ajax.response
                    resolve(response)
                } else {
                    reject("request error")
                }
            }
        }

        ajax.open(obj.method, obj.url)
        ajax.send(obj.method === "post" ? obj.data : null)
        
    })

}