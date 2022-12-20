const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  // console.log(req.cookies.token)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    console.log("Token not Found");
    return res.status(401).json({
      success: false,
      msg: "Not Authorized to use this route",
    });
  }

  // console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    console.log("Token found but jwt failed");
    return res.status(401).json({
      success: false,
      msg: "Not Authorized to use this route",
    });
  }
};

exports.loggedin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

exports.userInfo = async (req, res, next) => {
  const id = req.body.id;

  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.Role)) {
      res.status(401).json({
        msg: `${req.user.Role} Can not use this route`,
      });
    }
    next();
  };
};
