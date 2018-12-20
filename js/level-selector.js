
let levelSelector = Vue.component('LevelSelector', {
    template: '#level-selector-template',
    store,
    computed: {
        levels() {
            return this.$store.state.levels;
        }
    },
    methods: {

    },
    mounted() {
        if (localStorage.unlockedLevelIndex) {
            store.commit('unlockLevels', localStorage.unlockedLevelIndex);
        }
    }
});

