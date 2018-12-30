const store = new Vuex.Store({
    state: {
        levelMap:  [
            "wwwww",
            "w w w",
            "w oxw",
            "wwwww"]
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
        }
});

var game = new Vue({
  el: '#game',
  data: {}
});

