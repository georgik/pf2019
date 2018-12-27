
function levelIndexMapper (route) {
    return {
        levelIndex:  parseInt(route.params.levelIndex) - 1
    };
}

const routes = [
    {
        path: '/', component: levelSelector,
        children: [{
            path: '/info',
            component: infoComponent
        }]
    },
    {
        path: '/xxinfo',
        component: infoComponent
    },
    {
        path: '/level/:levelIndex',
        component: gameStage,
        props: levelIndexMapper,
        children: [
            { path: 'complete', component: levelComplete, props: levelIndexMapper },
        ]
    },
    { path: '/reset', component: resetComponent }
];


const router = new VueRouter({
    routes // short for `routes: routes`
});


var app = new Vue({
    router,
    el: '#app',
    data: {}
});
