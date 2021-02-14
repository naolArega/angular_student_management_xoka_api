const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller");

const api = express();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.get("/:type", controller.getAllObjects);

api.get("/:type/:id", controller.getSingleObject);

api.post("/:type", controller.createNewObject);

api.patch("/:type/:id", controller.updateObject);

api.delete("/:type/:id", controller.deleteObject);

api.listen(80, "api.studentangularxoka.io", () => {
    console.log("Api server is now running at api.studentangularxoka.io");
});