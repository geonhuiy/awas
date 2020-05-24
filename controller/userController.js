const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRound = 12;
const jwt = require("jsonwebtoken");
const addUser = async (req, res) => {
  try {
    if (await userModel.findOne({ username: req.body.username })) {
      res.status(409).json("Username taken");
    } else {
      const newUser = {
        username: req.body.username,
        password: req.body.password,
        admin: false,
      };
      //const hash = bcrypt.hashSync(newUser.password, saltRound);
      //newUser.password = hash;
      const savedUser = new userModel(newUser);
      const result = await savedUser.save();
      userLogin(req, res);
    }

    //res.json(result);
  } catch (e) {
    throw new Error(e);
  }
};
const deleteUser = async (req, res) => {
  try {
  } catch (e) {
    throw new Error(e);
  }
};
const modifyUser = async (req, res) => {
  try {
  } catch (e) {
    throw new Error(e);
  }
};
const userLogin = async (req, res) => {
  try {
    const user = await userModel.findOne(
      {
        username: req.body.username,
        password: req.body.password,
      },
      function (err, data) {
        if (err) {
          res.send(err);
        } else if (data) {
            console.log(data);
          res.json("Login successful");
        } else {
          res.json("Wrong username or password");
        }
      }
    );

    /*if (user == null || user.password != req.body.password) {
      res.status(401).json("Wrong username or password");
      console.log(req.body);
    }*/
    /*if (user && user.password == req.body.password) {
      const token = jwt.sign({ user: user.id }, process.env.SECRET);
      res.json(token);
    }*/
  } catch (e) {
    throw new Error(e);
  }
};

const checkAdmin = async (req, res) => {
  const potentialAdmin = await userModel.findById(req.params.id);
  if (potentialAdmin.admin) {
    console.log("Admin");
  } else {
    console.log("Not an admin");
  }
};

module.exports = {
  addUser,
  deleteUser,
  modifyUser,
  checkAdmin,
  userLogin,
};
