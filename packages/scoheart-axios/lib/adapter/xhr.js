
 function xhrAdapter(config) {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.open(config.method, config.url)

        xhr.send()

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve(xhr.response)
                }else{
                    reject("error")
                }
            }
        }
    })
}

export default xhrAdapter