const express = require("express");
const app = express();
const { check, body, validationResult } = require("express-validator");
require("dotenv").config();
app.use(express.json());
app.post(
  "/",
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be 5 char")
    .matches(/\d/)
    .withMessage("Password must contain atleast one digit"),
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({
        err: err.array(),
      });
    }
    res.status(200).json({ msg: "hi user", data: req.body.password });
  }
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` server is running on port number ${PORT}`);
});
