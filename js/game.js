const tileWidth = 64;
const tileHeight = 64;

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
            if (state.actors[0].x < 1024) {
                state.actors[0].x += tileWidth;
            }
        },
        moveLeft (state) {
            if (state.actors[0].x > 0) {
                state.actors[0].x -= tileWidth;
            }
        },
        moveDown (state) {
            if (state.actors[0].y < 1024) {
                state.actors[0].y += tileHeight;
            }
        },
        moveUp (state) {
            if (state.actors[0].y > 0) {
                state.actors[0].y -= tileHeight;
            }
        },
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
    store,
    data: {
    },
    methods: {
        mouseClicked: function(event) {
            var avatar = this.$store.state.actors[0];
            var deltaX = event.clientX - avatar.x - 32;
            var deltaY = event.clientY - avatar.y - 32;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    store.commit('moveRight');
                } else {
                    store.commit('moveLeft');
                }
            } else {
                if (deltaY > 0) {
                    store.commit('moveDown');
                } else {
                    store.commit('moveUp');
                }
            }
        }
    }
})
