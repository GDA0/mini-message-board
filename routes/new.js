const express = require("express");
const messages = require("../public/javascripts/messages");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("form", { title: "Add new message" });
});

router.post("/", (req, res, next) => {
  const { user, text } = req.body;
  messages.push({ id: uuidv4(), user: user, text: text, added: new Date() });
  res.redirect("/");
});

module.exports = router;
