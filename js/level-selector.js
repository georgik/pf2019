
let levelSelector = Vue.component('LevelSelector', {
    template: '#level-selector-template',
    store,
    computed: {
        levels() {
            return this.$store.state.levels;
        }
    },
    methods: {
    }
});

