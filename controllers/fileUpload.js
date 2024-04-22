const File = require("../models/File");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    //fetch filefrom request
    const file = req.files.file;
    console.log("FILE AAGYI JEE -> ", file);

    //create path where file need to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH-> ", path);

    //add path to the move fucntion
    file.mv(path, (err) => {
      console.log(err);
    });

    //create a successful response
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log("Not able to upload the file on server");
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// async function to get all the details of users and posts
exports.getallDetails = async (req, res) => {
  try {
    const allPost = await File.find().populate("user");
    const allUser = await User.find();
    res.json({
      success: true,
      allPost,
      allUser,
      message: "All Details Fetched Successfully",
    });
  } catch (error) {
    console.log("Not able to fetch the details");
    console.log(error);
  }
};

exports.getuser = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  console.log(user);
  return res.json(user);
};

//image upload ka hadnler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    console.log("this is the form data from frontend  -- > ", req.body);
    console.log(
      "this is the user data extracted from the token -- > ",
      req.user
    );
    const { tags, title, content } = req.body;
    console.log(tags, title, content);

    const file = req.files.imageFile;
    console.log(file);

    //Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    //file format supported hai
    console.log("Uploading to abir's cloudinary");
    const response = await uploadFileToCloudinary(file, "abir");
    console.log(response);

    //db me entry save krni h
    const fileData = await File.create({
      user: req.user.id,
      tags,
      title,
      content,
      imageUrl: response.secure_url,
    });

    await fileData.populate("user");

    res.json({
      success: true,
      fileData,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
