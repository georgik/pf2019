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
        isWalkable: function(coordX, coordY) {
            let tileX = coordX / this.$store.state.tile.width;
            let tileY = coordY / this.$store.state.tile.height;
            let tile = this.$store.state.levelMap[tileY][tileX];
            return (tile === " ");
        },
        mouseClicked: function (event) {
            let avatar = this.$store.state.actors[0];
            let deltaX = event.clientX - avatar.x - 32;
            let deltaY = event.clientY - avatar.y - 32;
            let tileWidth = this.$store.state.tile.width;
            let tileHeight = this.$store.state.tile.height;
            let maxX = this.$store.state.level.width - tileWidth;
            let maxY = this.$store.state.level.height - tileHeight;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    if ((avatar.x < maxX) && (this.isWalkable(avatar.x + tileWidth, avatar.y))) {
                        store.commit('moveRight');
                    }
                } else {
                    if ((avatar.x > 0) && (this.isWalkable(avatar.x - tileWidth, avatar.y))) {
                        store.commit('moveLeft');
                    }
                }
            } else {
                if (deltaY > 0) {
                    if ((avatar.y < maxY) && (this.isWalkable(avatar.x, avatar.y + tileHeight))) {
                        store.commit('moveDown');
                    }
                } else {
                    if ((avatar.y > 0) && (this.isWalkable(avatar.x, avatar.y - tileHeight))) {
                        store.commit('moveUp');
                    }
                }
            }
        }
    }
});
