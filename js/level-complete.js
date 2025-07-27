
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
        actualLevelIndex() {
            // Get correct level index from route if props are not set correctly
            if (this.$route && this.$route.params && this.$route.params.levelIndex) {
                return parseInt(this.$route.params.levelIndex) - 1;
            }
            return this.levelIndex;
        },
        nextLevelClassName() {
            if (this.$store.state.levels.length === (this.actualLevelIndex + 2) ) {
                return 'last-level';
            }
            return 'next-level';
        }
    },
    methods: {
    }
});

