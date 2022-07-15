const express = require("express");

const mainController = require("./controller");
const router = express.Router();

router.get("/", mainController.getData);
router.get("/randomize", mainController.randomData);

module.exports = router;