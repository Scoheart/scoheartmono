
export class Dep{
    constructor() {
        this.subs = []
    }

    addSub(watcher){
        this.subs.push(watcher)
    }

    notify(){
        this.subs.forEach(element => {
            element.update()
        });
    }
}

Dep.target = null