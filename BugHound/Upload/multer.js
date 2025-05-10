const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "upload",
    allowed_formats: ["jpg", "png", "jpeg", "jfif"],
    resource_type: "image"   
  },
});

const fileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["pdf"],
    resource_type: "raw"    
  },
});

exports.uploadImage = multer({ storage: imageStorage });
exports.uploadFile = multer({ storage: fileStorage });
