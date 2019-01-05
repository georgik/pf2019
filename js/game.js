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
        }
});

var game = new Vue({
  el: '#game',
  data: {}
});

