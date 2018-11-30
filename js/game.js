const tileWidth = 64;
const tileHeight = 64;

let store = new Vuex.Store({
    state: {
        levelMap: [
            "wwwww",
            "w  ww",
            "w   w",
            "wwwww"],
        tile: {
            width: tileWidth,
            height: tileHeight,
        },
        level: {
            width: 5 * tileWidth,
            height: 4 * tileWidth
        },
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
        moveRight(state) {
            state.actors[0].x += state.tile.width;
        },
        moveLeft(state) {
            state.actors[0].x -= state.tile.width;
        },
        moveDown(state) {
            state.actors[0].y += state.tile.height;
        },
        moveUp(state) {
            state.actors[0].y -= state.tile.height;
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

    methods: {}
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


let game = new Vue({
    el: '#game',
    store,
    data: {},
    methods: {
        mouseClicked: function (event) {
            let avatar = this.$store.state.actors[0];
            let deltaX = event.clientX - avatar.x - 32;
            let deltaY = event.clientY - avatar.y - 32;
            let maxX = this.$store.state.level.width - this.$store.state.tile.width;
            let maxY = this.$store.state.level.height - this.$store.state.tile.height;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    if (avatar.x < maxX) {
                        store.commit('moveRight');
                    }
                } else {
                    if (avatar.x > 0) {
                        store.commit('moveLeft');
                    }
                }
            } else {
                if (deltaY > 0) {
                    if (avatar.y < maxY) {
                        store.commit('moveDown');
                    }
                } else {
                    if (avatar.y > 0) {
                        store.commit('moveUp');
                    }
                }
            }
        }
    }
});
