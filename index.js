//app create
const express = require("express");
const app = express();

//PORt find krna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krne h
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//db connecting
const db = require("./config/database");
db.connect();

//cloudinary connecting
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mounting the api route
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
