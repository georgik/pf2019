
let levelComplete = Vue.component('LevelComplete', {
    template: '#level-complete-template',
    store,
    props: {
        levelIndex: {
            type: Number,
            default: 0
        }
    },
    computed: {
        nextLevelClassName() {
            if (this.$store.state.levels.length === (this.levelIndex + 1) ) {
                return 'last-level';
            }
            return 'next-level';
        }
    },
    methods: {
    }
});

