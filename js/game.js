const store = new Vuex.Store({
    state: {
        levelMap:  [
            "wwwww",
            "w  ww",
            "w   w",
            "wwwww"],
        actors: [
            { 
                name: 'avatar',
                x: 64,
                y: 64
            },
            { 
                name: 'mfd',
                x: 128,
                y: 64
            }
        ]
    },
    mutations: {
        moveRight (state) {
            state.actors[0].x += 64;
        }
    }
});

Vue.component('playground', {
    template: '#playground-template',
    store,
    props: {},
    computed: {

        levelMap() {
            return this.$store.state.levelMap;
        }
    },

    methods: {
    }
});


Vue.component('stage', {
    template: '#stage-template',
    store,
    props: {},
    computed: {
        actors() {
            return this.$store.state.actors;
        }
    }
});



var game = new Vue({
    el: '#game',
    data: {
    },
    methods: {
        mouseClicked: function() {
            store.commit('moveRight');
        }
    }
})
