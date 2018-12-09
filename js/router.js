
function levelIndexMapper (route) {
    return {
        levelIndex:  parseInt(route.params.levelIndex) - 1
    };
}

const routes = [
    { path: '/', component: levelSelector },
    { path: '/level/:levelIndex', component: gameStage, props: levelIndexMapper }
];


const router = new VueRouter({
    routes // short for `routes: routes`
});


var app = new Vue({
    router,
    el: '#app',
    data: {}
});
