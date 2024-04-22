// auth, isStudent,isAdmin

const jwt = require("jsonwebtoken");
// const User = require("../model/User");
require("dotenv").config();

exports.auth = (req, res, next) => {
  // extract JWT Token
  // PENDING:other ways to fetch token
  console.log("i have reached here ");
  console.log("header", req.header("Authorization"));
  console.log("token", req.header("Authorization").split(" ")[1]);
  try {
    console.log("header inside ", req.header("Authorization"));

    var token = req.header("Authorization").split(" ")[1];
    console.log("token inside ", token);

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //   verify the token
    try {
      console.log("inside verification of token");
      var payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong,while verifying the token",
      error: error,
    });
  }
};
