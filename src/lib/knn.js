import diContainer from "./Service";
import _ from "lodash";
import appStore from "./appStore";
import Toastify from "toastify-js";
const db = diContainer.get("database");
const k = 3;
var predictionPoint;

appStore.subscribe((val) => {
  predictionPoint = val.predictionPoint;
});

function distance(point) {
  return Math.abs(point - predictionPoint);
}

export default function knn() {
  var records = db.records;
  const prediction = _.chain(records)
    .map((o) => _.toArray(o))
    .map((row) => [distance(row[1]), row[5]]) // only x position and bucket no
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();

  Toastify({
    text: `prediction bucket no  is ${prediction}`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}
