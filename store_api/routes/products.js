const express = require("express")
const controller = require("../controllers/products")

const router = express.Router()

router.route("/").get(controller.getAllProducts)
router.route("/static").get(controller.getAllProductsStatic)

module.exports = router