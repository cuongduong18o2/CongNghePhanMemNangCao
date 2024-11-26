const jwt = require("jsonwebtoken");

const middlewareController = {
  // Verify Token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      // Tách token dạng "Bearer abcdef" và lấy phần sau
      const accessToken = token.split(" ")[1];

      // Verify token
      jwt.verify(accessToken, process.env.MY_ACCESS_KEY, (err, user) => {
        if (err) {
          // 403 là bị ngăn cấm truy cập
          return res.status(403).json("Token is not valid!!");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  // Verify Token and Admin Authentication
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      // Sửa từ "veriyfyToken" thành "verifyToken"
      if (req.user.id === req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to delete others");
      }
    });
  },
};

module.exports = middlewareController;
