const express = require("express");
const messages = require("../public/javascripts/messages");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

router.get("/messages/:id", (req, res, next) => {
  const message = messages.find((msg) => msg.id === req.params.id);
  if (message) {
    res.render("message", { message });
  } else {
    res.status(404).send("Message not found");
  }
});

module.exports = router;
