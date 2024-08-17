import { writable } from "svelte/store";

const state = {
  bucketCounter: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  },
  cursorBall: null,
  bounciness: 0.5,
  radius: 10,
  createNewBall: null,
  predictionPoint: 300,
};
const appStore = writable(JSON.parse(JSON.stringify(state)));

export default appStore;
