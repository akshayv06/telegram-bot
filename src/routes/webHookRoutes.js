const express = require("express");
const router = express.Router();
const { handleMessage } = require("../controller/botController");

router.post("/telegram", handleMessage);

module.exports = router;
