const tileWidth = 64;
const tileHeight = 64;


let store = new Vuex.Store({
    state: {
        levels: datadisc,
        levelMap: [],
        tile: {
            width: tileWidth,
            height: tileHeight,
        },
        level: {
            width: 0,
            height: 0,
            name: ""
        },
        actors: [ ],
        undoActors: null
    },
    mutations: {
        updateName(state, { actor, name}) {
            actor.name = name;
        },
        moveVector(state, { actor, vectorX, vectorY }) {
            actor.x += vectorX * state.tile.width;
            actor.y += vectorY * state.tile.height;
        },
        loadLevel(state, levelIndex) {
            let storedLevel = state.levels[levelIndex];
            // state.levelMap = storedLevel.levelMap;
            state.levelMap = [];
            state.actors = [];

            for(let y = 0; y < storedLevel.levelMap.length; y++) {
                state.levelMap.push([]);
                for (let x = 0; x < storedLevel.levelMap[y].length; x++) {
                    let tile = storedLevel.levelMap[y][x];

                    if (tile === "a") {
                        state.actors.unshift({
                            name: 'avatar',
                            x: x * tileWidth,
                            y: y * tileHeight
                        });
                        tile = " ";

                    } else if (tile === "o") {
                        state.actors.push( {
                            name: 'mfd',
                            x: x * tileWidth,
                            y: y * tileHeight
                        });
                        tile = " ";
                    }
                    state.levelMap[y].push(tile);
                }
            }

            // Compute stage size
            state.level = {
                height: storedLevel.levelMap.length * tileWidth,
                width: storedLevel.levelMap[0].length * tileWidth,
                name: levelIndex + 1
            };

            state.undoActors = null;
        },
        unlockLevels(state, levelIndex) {
            // Unlock all levels below the index. Use in case of initial loading
            for (let storedLevelIndex = 0; storedLevelIndex < state.levels.length; storedLevelIndex++) {
                state.levels[storedLevelIndex].isLocked = (levelIndex <= storedLevelIndex);
            }
        },
        unlockLevel(state, levelIndex) {
            if (levelIndex >= state.levels.length) {
                return;
            }
            state.levels[levelIndex].isLocked = false;
            localStorage.unlockedLevelIndex = levelIndex + 1;
        },
        snapshot(state) {
            state.undoActors = JSON.parse(JSON.stringify(state.actors));
        },
        undo(state) {
            if (state.undoActors == null) {
                return;
            }
            state.actors = state.undoActors;
            state.undoActors = null;
        }
    }
});
