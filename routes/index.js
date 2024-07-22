const express = require("express");
const messages = require("../public/javascripts/messages");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

module.exports = router;
