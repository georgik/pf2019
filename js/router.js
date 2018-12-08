
const routes = [
    { path: '/', component: levelSelector },
    { path: '/level/:id', component: gameStage }
];


const router = new VueRouter({
    routes // short for `routes: routes`
});


var app = new Vue({
    router,
    el: '#app',
    data: {}
});
