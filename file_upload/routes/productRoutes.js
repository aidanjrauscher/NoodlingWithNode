const productController = require("../controllers/productController");
const uploadsController = require("../controllers/uploadsController");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router.route("/upload").post(uploadsController.uploadProductImage);

module.exports = router;
