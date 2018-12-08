const tileWidth = 64;
const tileHeight = 64;

let store = new Vuex.Store({
    state: {
        levels: [{
            levelMap: [
                "wwwwwww",
                "wa    w",
                "w  o  w",
                "w   x w",
                "w     w",
                "wwwwwww"]

        }],
        levelMap: [],
        tile: {
            width: tileWidth,
            height: tileHeight,
        },
        level: {
            width: 7 * tileWidth,
            height: 6 * tileWidth
        },
        actors: [ ]
    },
    mutations: {
        moveVector(state, { actor, vectorX, vectorY }) {
            actor.x += vectorX * state.tile.width;
            actor.y += vectorY * state.tile.height;
        },
        loadLevel(state, levelIndex) {
            let storedLevel = state.levels[levelIndex];
            state.levelMap = storedLevel.levelMap;
            for(let y = 0; y < storedLevel.levelMap.length; y++) {
                for (let x = 0; x < storedLevel.levelMap[y].length; x++) {
                    let tile = storedLevel.levelMap[y][x];

                    if (tile === "a") {
                        state.actors.unshift({
                            name: 'avatar',
                            x: x * tileWidth,
                            y: y * tileHeight
                        });
                        state.levelMap[y][x] = " ";
                    } else if (tile === "o") {
                        state.actors.push( {
                            name: 'mfd',
                            x: x * tileWidth,
                            y: y * tileHeight
                        });
                        state.levelMap[y][x] = " ";
                    }
                }
            }
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
        getTile: function(coordX, coordY) {
            let tileX = coordX / this.$store.state.tile.width;
            let tileY = coordY / this.$store.state.tile.height;
            return this.$store.state.levelMap[tileY][tileX];
        },
        isWalkable: function(coordX, coordY) {
            let tile = this.getTile(coordX, coordY)
            return ((tile === " ") || (tile === "x") || (tile === "o"));
        },
        isFinalPosition: function(coordX, coordY) {
            return (this.getTile(coordX, coordY) === "x");
        },
        getCollision: function(coordX, coordY) {
            for (let actorIndex=1; actorIndex<this.$store.state.actors.length; actorIndex++) {
                let actor = this.$store.state.actors[actorIndex];
                if ((actor.x === coordX) && (actor.y === coordY)) {
                    return actor;
                }
            }
            return null;
        },
        moveActor: function(actor, vectorX, vectorY) {
            let tileWidth = this.$store.state.tile.width;
            let tileHeight = this.$store.state.tile.height;
            let maxX = this.$store.state.level.width - tileWidth;
            let maxY = this.$store.state.level.height - tileHeight;

            // Movement should remain in playground
            if ((actor.x >= maxX) || (actor.y >= maxY) || (actor.x <= 0) || (actor.y <= 0)) {
                return false;
            }

            // It's not possible to walk through walls
            if (!this.isWalkable(actor.x + vectorX * tileWidth, actor.y + vectorY * tileHeight)) {
                return false;
            }
            store.commit('moveVector', { actor, vectorX, vectorY });
            return true;
        },
        isSolved() {
            for (let actorIndex=1; actorIndex<this.$store.state.actors.length; actorIndex++) {
                let actor = this.$store.state.actors[actorIndex];
                if (!this.isFinalPosition(actor.x, actor.y)) {
                    return false;
                }
            }
            return true;
        },
        moveAvatar: function(avatar, vectorX, vectorY) {
            let tileWidth = this.$store.state.tile.width;
            let tileHeight = this.$store.state.tile.height;

            let actor = this.getCollision(avatar.x + vectorX * tileWidth, avatar.y + vectorY * tileHeight);

            if (actor != null) {
                let isMovable = this.moveActor(actor, vectorX, vectorY);
                if (!isMovable) {
                    return;
                }
            }
            this.moveActor(avatar, vectorX, vectorY);

            if (this.isSolved()) {
                alert("Solved");
            }
        },
        mouseClicked: function (event) {
            let avatar = this.$store.state.actors[0];
            let deltaX = event.clientX - avatar.x - 32;
            let deltaY = event.clientY - avatar.y - 32;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    this.moveAvatar(avatar, 1, 0);
                } else {
                    this.moveAvatar(avatar, -1, 0);
                }
            } else {
                if (deltaY > 0) {
                    this.moveAvatar(avatar, 0, 1);
                } else {
                    this.moveAvatar(avatar, 0, -1);
                }
            }
        }
    },
    beforeMount() {
        store.commit("loadLevel", 0);
    }
});
