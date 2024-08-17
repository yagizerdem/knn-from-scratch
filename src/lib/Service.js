import Database from "./Database";

import DiContainer from "di-container";
var diContainer = new DiContainer();

const database = Database.init();

diContainer.register("database", database);

export default diContainer;
