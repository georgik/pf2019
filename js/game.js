Vue.component('navigation-bar', {
    template: '#navigation-bar-template',
    store,
    computed: {
        levelName() {
            return this.$store.state.level.name;
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

Vue.component('level-access-button', {
    template: '#level-access-button-template',
    computed: {
        type () {
            if (!this.isLocked) {
                return 'router-link'
            }

            return 'div'
        },
        value () {
            if (this.isLocked) {
                return '';
            }

            return this.text;
        },
        classObject () {
            if (this.isLocked) {
                return 'level-lock fas fa-lock'
            }
        }
    },
    props: {
        isLocked: {
            type: Boolean
        },
        to: {
            type: String
        },
        text: {
            type: String
        }
    }
});

let resetComponent = Vue.component('reset-component', {
    template: '#reset-component-template',
    store,
    mounted() {
        store.commit('unlockLevel', 0);
    }
});


let gameStage = Vue.component('GameStage', {
    template: '#game-stage-template',
    store,
    props: {
        levelIndex: {
            type: Number,
            default: 0
        }
    },
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

                // 2nd actor in the row is not movable
                let actor2 = this.getCollision(avatar.x + vectorX * 2 * tileWidth, avatar.y + vectorY * 2 * tileHeight);
                if (actor2 != null) {
                    return;
                }

                let isMovable = this.moveActor(actor, vectorX, vectorY);
                if (!isMovable) {
                    return;
                }
            }
            this.moveActor(avatar, vectorX, vectorY);

            if (this.isSolved()) {
                store.commit('unlockLevel', this.$props.levelIndex + 1);
                this.$router.push({ path: `/level/${this.$props.levelIndex + 1}/complete` });
            }
        },
        mouseClicked: function (event) {
            let avatar = this.$store.state.actors[0];
            let rect = event.currentTarget.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let top = rect.top + scrollTop;
            let left = rect.left + scrollLeft;
            let deltaX = event.clientX - avatar.x - 32 - left;
            let deltaY = event.clientY - avatar.y - 32 - top;

            // Click within the avatar
            if (Math.abs(deltaX) < 32) {
                deltaX = 0;
            }

            if (Math.abs(deltaY) < 32) {
                deltaY = 0;
            }

            // Do not move in case of click inside the icon of avatar
            if ((deltaX === 0) && (deltaY === 0)) {
                return;
            }

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
    created() {
        store.commit("loadLevel", this.$props.levelIndex);
    },
});

