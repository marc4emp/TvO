const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const channelSchema = new Schema(
  {
    _id: ObjectId,
    name: { type: String, trim: true },
    url: String,
    categorie: String,
    country: String,
    available: Boolean,
    logo: String,
    description: String,
  },
  { timestamps: true }
);

const ChannelModel = mongoose.model("Channel", channelSchema);

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

const getChannels = async (req, res) => {
  try {
    const response = await ChannelModel.find();
    res.json({ message: "Channel list", channels: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
const getChannel = async (req, res) => {
  const _id = req.params.idChannel
  try {
    const response = await ChannelModel.findById(_id);
    res.json({ message: "Channel found", channel: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
const createChannel = async (req, res) => {
  const urlLogo = 'http://localhost:3001/img/' + req.file.filename;
  const newChannel = new ChannelModel({
    _id: new ObjectId(),
    name: req.body.name,
    url: req.body.url,
    categorie: req.body.categorie,
    country: req.body.country,
    available: req.body.available,
    logo: urlLogo,
    description: req.body.description,
  });
  try {
    const response = await newChannel.save();
    res.json({ message: "Channel created", new_channel: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
const modifyChannel = async (req, res) => {
  const _id = req.params.idChannel;
  const modif = req.body;
  try {
    const response = await ChannelModel.findByIdAndUpdate(_id, modif);
    res.json({ message: "Channel modified", modified_channel: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
const deleteChannel = async (req, res) => {
  const _id = req.params.idChannel;
  try {
    const response = await ChannelModel.findByIdAndDelete(_id);
    res.json({ message: "Channel deleted", deleted_channels: response });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
 
router.get("/", getChannels);
router.get("/:idChannel", getChannel);
router.post("/", upload.single('logo'), createChannel);
router.put("/:idChannel", modifyChannel);
router.delete("/:idChannel", deleteChannel);

module.exports = router;
