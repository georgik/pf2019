
function levelIndexMapper (route) {
    return {
        levelIndex:  parseInt(route.params.levelIndex) - 1
    };
}

const routes = [
    {
        path: '/', 
        name: 'home',
        component: levelSelector,
        children: [{
            path: '/info',
            name: 'info',
            component: infoComponent
        }]
    },
    {
        path: '/xxinfo',
        name: 'info-alt',
        component: infoComponent
    },
    {
        path: '/level/:levelIndex',
        name: 'level',
        component: gameStage,
        props: levelIndexMapper,
        children: [
            { 
                path: 'complete', 
                name: 'level-complete',
                component: levelComplete, 
                props: levelIndexMapper 
            },
        ]
    },
    { 
        path: '/reset', 
        name: 'reset',
        component: resetComponent 
    }
];


const router = new VueRouter({
    mode: 'hash',
    routes // short for `routes: routes`
});


var app = new Vue({
    router,
    el: '#app',
    data: {}
});
