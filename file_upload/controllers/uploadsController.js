const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file uploaded.");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Uploaded file must be an image.");
  }
  const maxImageSize = 1024 * 1024;
  if (productImage.size > maxImageSize) {
    throw new BadRequestError(
      `Uploaded file must be less than ${maxImageSize} bytes`
    );
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK);
  res.json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file uploaded.");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Uploaded file must be an image.");
  }
  const maxImageSize = 1024 * 1024;
  if (productImage.size > maxImageSize) {
    throw new BadRequestError(
      `Uploaded file must be less than ${maxImageSize} bytes`
    );
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "NodeFileUpload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK);
  res.json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
