const express = require("express");
const qaController = require("../controllers/questionsController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/", md_auth.ensureAuth, qaController.getAllQuestions);
api.get("/:id", md_auth.ensureAuth, qaController.getQuestion);
api.post("/create", md_auth.ensureAuth, qaController.addQuestion);
api.put("/update/:id", md_auth.ensureAuth, qaController.updateQuestion);
api.put("/restart", md_auth.ensureAuth, qaController.restartQuestions);
api.delete("/delete/:id", md_auth.ensureAuth, qaController.deleteQuestion);

module.exports = api;
