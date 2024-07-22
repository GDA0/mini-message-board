const express = require("express");
const messages = require("../public/javascripts/messages");

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("form");
});

router.post("/", (req, res, next) => {
  const { user, text } = req.body;
  messages.push({ user: user, text: text, added: new Date() });
  res.redirect("/");
});

module.exports = router;
