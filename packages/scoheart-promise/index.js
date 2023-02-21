function Promise(executor) {

    this.PromiseState = "pending"
    this.PromiseResult = null
    this.callbacks = []
    resolve = (resolveData) => {
        if (this.PromiseState === "pending") {
            this.PromiseState = "fullfilled"
            this.PromiseResult = resolveData
        }

        // async callback
        // if(this.callback.onResolved){
        //     this.callback.onResolved(resolveData)
        // }

        //async callback array
        this.callbacks.forEach( callback => {
            callback.onResolved(resolveData)
        } )
    }

    reject = (rejectData) => {
        if (this.PromiseState === "pending") {
            this.PromiseState = "rejected"
            this.PromiseResult = rejectData
        }

        // if(this.callback.onRejected){
        //     this.callback.onRejected(rejectData)
        // }

         //async callback array
         this.callbacks.forEach( callback => {
            callback.onRejected(rejectData)
        } )
    }

    // try catch throw exception
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}


Promise.prototype.then = function (onResolved, onRejected) {
   
    return new Promise((resolve, reject) => {

        //sync 
        if(this.PromiseState === "fullfilled"){
            let thenOnresolvedResult = onResolved(this.PromiseResult)

            if(thenOnresolvedResult instanceof Promise){
                thenOnresolvedResult.then(resolveValue => {
                    resolve(resolveValue)
                }, rejectValue => {
                    reject(rejectValue)
                })
            }else{
                resolve(thenOnresolvedResult)
            }
        }

        if(this.PromiseState === "rejected"){
            onRejected(this.PromiseResult)
        }

        // async
        if(this.PromiseState === "pending"){
            this.callbacks.push({
                onResolved,
                onRejected
            })
        }

    })
}

let p = new Promise((resolve, reject) => {
    resolve("yes")
    // reject("a")
    // throw "err"
    // setTimeout(()=> {
    //     resolve("sdf")
    // }, 1000)
})

const res = p.then( (value) => {

    return new Promise((resolve, reject) => {
        resolve("then resolve")
        // reject("errrrrrr")
    })

}, value => {
    // console.log(value)
})

const res1 = res.then(v => {
    // console.log(v)
}, r => {
    // console.log(r)
})

console.log(res)
console.log(res1)





