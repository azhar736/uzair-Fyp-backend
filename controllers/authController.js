var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

//SignUp Controller
const SignUp = asyncHandler(async (req, res, next) => {
  // res.send("Sign Up Route...");
  // console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    } else {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneno: req.body.phoneno,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
          res.status(201).send({ user: user, token: token });
          // res.status(201).json("User has been registered successfully");
        })
        .catch((error) =>
          res.json({
            error: "Please enter a valid email address",
            message: error.message,
          })
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error ABC");
  }
});

//SignIn Controller

const SignIn = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // res.send("Sign In Route...");
  const { email, password } = req.body;

  // Check both fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Check Password length
  if (password.lenth < 8) {
    res.status(400);
    throw new Error("Minimum password length must be 8 characters");
  }

  //generate Token

  const token = await jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  let user = await User.findOne({ email: email });

  //Check if user does not already exist

  if (!user) {
    return res
      .status(400)
      .json({ err: "User with this don't exist,Please register first" });
    // throw new Error("User does not exist Please Register First");
  }

  //Check for password

  if (user.password !== password) {
    return res
      .status(400)
      .json({ err: "Please try to login with correct credentials" });
    // throw new Error("Incorrect password");
  }

  //SignIn the User

  res.send({
    message: "Sign In Successfully",
    token,
  });
});

//Forgot Passwords

const forgotPasswords = asyncHandler(async (req, res, next) => {
  res.send("Forgot Password");
});

//Chnage Passwords

const changePassword = asyncHandler(async (req, res, next) => {
  res.send("Chnage Password");
});
module.exports = { SignUp, SignIn, forgotPasswords, changePassword };
