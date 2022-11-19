const express = require("express")
const mainController = require("../controllers/main")
const authenticate = require("../middleware/auth")

const router = express.Router()

router.route("/login").post(mainController.login)
router.route("/dashboard").get(authenticate, mainController.dashboard)

module.exports = router

