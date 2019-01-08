const store = new Vuex.Store({
    state: {
        levelMap:  [
            "wwwww",
            "w w w",
            "w oxw",
            "wwwww"],
        gameObjects: [
            {
                name: 'avatar',
                x: 1,
                y: 1
            },
            {
                name: 'box',
                x: 2,
                y: 2
            }
        ]
    },
    mutations: {
        moveObject(state, { gameObject, vectorX, vectorY }) {
            gameObject.x += vectorX;
            gameObject.y += vectorY;
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
        },
        gameObjects() {
            return this.$store.state.gameObjects;
        }
    },
    methods: {
        moveGameObject: function(gameObject, vectorX, vectorY) {
            store.commit("moveObject", { gameObject, vectorX, vectorY });
        },
        mouseClicked: function(event) {
            let rect = event.currentTarget.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let top = rect.top + scrollTop;
            let left = rect.left + scrollLeft;

            let avatar = this.$store.state.gameObjects[0];
            let deltaX = (event.clientX - left - 32)/64 - avatar.x;
            let deltaY = (event.clientY - top - 32)/64 - avatar.y;

            // Ignore clicks within avatar box
            if (Math.abs(deltaX) < 0.5) {
                deltaX = 0;
            }

            if (Math.abs(deltaY) < 0.5) {
                deltaY = 0;
            }

            // Do not move in case of click inside the icon of avatar
            if ((deltaX === 0) && (deltaY === 0)) {
                return;
            }

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    this.moveGameObject(avatar, 1, 0);
                } else {
                    this.moveGameObject(avatar, -1, 0);
                }
            } else {
                if (deltaY > 0) {
                    this.moveGameObject(avatar, 0, 1);
                } else {
                    this.moveGameObject(avatar, 0, -1);
                }
            }
        }
    }
});

var game = new Vue({
  el: '#game',
  data: {}
});

