const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema(
  {
    _id: ObjectId,
    email: { type: String, required: true, trim: true },
    password: String,
    watchlist: Array,
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
  try {
    const response = await userModel.find();
    res.json({ message: "User list", users: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get("/:idUser", async (req, res) => {
  const _id = req.params.idUser
  try {
    const response = await userModel.findById(_id);
    res.json({ message: "User found", users: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const newUser = new userModel({
    _id: new ObjectId(),
    email: req.body.email,
    password: req.body.password,
    watchlist: req.body.watchlist,
  });
  try {
    const response = await newUser.save();
    res.json({ message: "User created", new_user: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put("/:idUser", async (req, res) => {
  const _id = req.params.idUser;
  const modif = req.body;
  try {
    const response = await userModel.findByIdAndUpdate(_id, modif);
    res.json({ message: "User modified", modified_user: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.delete("/:idUser", async (req, res) => {
  const _id = req.params.idUser;
  try {
    const response = await userModel.findByIdAndDelete(_id);
    res.json({ message: "User deleted", modified_user: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;