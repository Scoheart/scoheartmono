
let routes = [
    {
        name: "Basic",
        component: "Basic"
    },
    {
        name: "Education",
        component: "Education"
    },
    {
        name: "Project",
        component: "Project"
    },
    {
        name: "Work",
        component: "Work"
    },
    {
        name: "Skill",
        component: "Skill"
    },
    {
        name: "Others",
        component: "Others"
    }

]

function ScoheartRouter (obj) {
    this.mode = obj.mode
    this.routes = obj.routes
    // function push(){
    //     console.log("first")
    // }
}

ScoheartRouter.prototype.push = function () {
    console.log("first")
}

const router = new ScoheartRouter({
    mode: "history",
    routes
})


