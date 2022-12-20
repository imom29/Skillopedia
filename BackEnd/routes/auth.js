const express = require("express");
const User = require("../models/user");
const pendingUser = require("../models/pendingRequest");
const {
  loggedin,
  protect,
  authorize,
  userInfo,
} = require("../middleware/protect");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, password, email } = req.body;

  const user = await pendingUser.create({
    firstname,
    lastname,
    password,
    email,
  });

  // console.log(req.body)

  sendTokenResponse(user, 200, res, "Request Recieved by Admin");
  // const token = user.getSignedJwtToken();

  // res.json({msg: "Request Recieved by Admin", token})
  // res.json({success: true})
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  console.log(password, email);

  if (!password || !email) {
    res.status(401).json({
      success: false,
    });
    return;
  }

  const resultUser = await User.findOne({ email: email }).select("+password");

  if (!resultUser) {
    res.status(401).json({
      success: false,
    });
    return;
  }

  const isMatch = await resultUser.matchPassword(password);

  if (!isMatch) {
    res.status(401).json({
      success: false,
      msg: "Wrong Password",
    });
  }

  sendTokenResponse(resultUser, 200, res, "Logged in!");

  // const token = resultUser.getSignedJwtToken();

  // res.json({msg: "Logged in!", token})
  // res.json({msg: "Logged in!"})
});

// router.get('/users', (req,res)=>{
//     const users = User.find()

//     console.log(users)

//     res.json({
//         success: true
//     })
// })

router.get("/loggedin", protect, loggedin);

router.post("/userinfo", userInfo);
//     res.json({
//         msg: "Test success"
//     })
// })

router.post("/approve", protect, authorize("admin"), async (req, res) => {
  const { id } = req.body;

  const Pr = await pendingUser.findById(id).select("+password");

  await pendingUser.deleteOne({ _id: id });
  // const user = User.create(Pr)

  const { firstname, lastname, password, email } = Pr;

  const user = await User.create({
    firstname,
    lastname,
    password,
    email,
  });

  res.json({
    success: true,
    msg: `Request Approved! of id = ${id}`,
    user,
  });
});

router.put("/addskill", protect, async (req, res) => {
  let token = req.cookies.token;

  // try {
  //     const decoded = jwt.verify(token, process.env.JWTSECRET)

  //     console.log(decoded)

  //     let user = await User.findById(decoded.id)

  // } catch (error) {
  //     res.status(401).json({
  //         success: false,
  //         msg: "Not Authorized to use this route"
  //     })
  // }

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  console.log(decoded);

  let user = await User.findById(decoded.id);

  if (!user) {
    res.status(401).json({
      success: false,
      msg: "Not Authorized to use this route",
    });
  }

  await user.updateOne({ $push: { skills: req.body.skill } });

  res.status(200).json({
    msg: "Skill Update Success",
  });
});

const sendTokenResponse = (user, statusCode, res, msg) => {
  const token = user.getSignedJwtToken();

  const options = {
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", `Bearer ${token}`, options)
    .json({ success: true, token, msg });
};

router.get("/users", async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    Count: users.length,
    users,
  });
});

router.get("/pendings", async (req, res, next) => {
  const pendings = await pendingUser.find();

  res.status(200).json({
    Count: pendings.length,
    pendings,
  });
});

module.exports = router;
