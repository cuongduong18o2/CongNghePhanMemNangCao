const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../model/model");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  // register user
  addUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //create new user

      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        phone: req.body.phone,
      });
      //save DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.MY_ACCESS_KEY,
      {
        expiresIn: "30d",
      }
    );
  },

  //refresh token

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.MY_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },

  //login user
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) {
        return res.status(404).json("sai tên đăng nhập !!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("sai mật khẩu !!");
      }
      if (user && validPassword) {
        const AccessToken = authController.generateAccessToken(user);

        // tao refresh token de lam moi moi khi no mat di
        //day la key du tru

        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...orther } = user._doc;
        res.status(200).json({ ...orther, AccessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  requestRefreshToken: async (req, res) => {
    //lay refresh token tu user
    const refreshtoken = req.cookies.refreshToken;
    res.status(200).json(refreshtoken);
    if (!refreshtoken) return res.status(401).json("You're not authenticated ");
    if (!refreshTokens.includes(refreshtoken)) {
      res.status(403).json("Refresh token is not valid ");
    }

    jwt.verify(refreshtoken, process.env.MY_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshtoken);
      //create new access and refresh token
      const newAccessToken = authController.generateAccessToken(user);
      const newrefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newrefreshToken);
      //luu vao cookies
      res.cookie("refreshToken", newrefreshToken, {
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ AccessToken: newAccessToken });
    });
  },
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json(" Log out successfully ! ");
  },
};

//refresh token

// luu tru token
// luu tru accesstoken bang redux store
//luu tru refresh token bang httponly cookie

//user Logout

module.exports = authController;
