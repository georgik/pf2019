const store = new Vuex.Store({
    state: {
        levelMap:  [
            "wwwww",
            "w  ww",
            "w   w",
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
