const store = new Vuex.Store({
    state: {
        levelMap:  [
            "WWWWW",
            "W OXW",
            "W   W",
            "WWWWW"]
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
            selectLanguage: function(language) {
            }
        }
    });





var game = new Vue({
  el: '#game',
  data: {
  }
})
