const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
  localFileUpload,
  imageUpload,
  getallDetails,
  getuser,
} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", auth, imageUpload);
router.get("/getallDetails", getallDetails);
router.get("/getuser", auth, getuser);
// router.post("/videoUpload",videoUpload );
// router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;
