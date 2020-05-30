const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const channelSchema = new Schema(
  {
    _id: ObjectId,
    name: { type: String, required: true, trim: true },
    url: String,
    categorie: String,
    country: String,
    available: Boolean,
  },
  { timestamps: true }
);

const ChannelModel = mongoose.model("Channel", channelSchema);

module.export = channelsControllers => {

  getChannels = async (req, res) => {
    try {
      const response = await ChannelModel.find();
      res.json({ message: "Channel list", channels: response });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  getChannel = async (req, res) => {
    const _id = req.params.idChannel
    try {
      const response = await ChannelModel.findById(_id);
      res.json({ message: "Channel found", channel: response });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  createChannel = async (req, res) => {
    const newChannel = new ChannelModel({
      _id: new ObjectId(),
      name: req.body.name,
      url: req.body.url,
      categorie: req.body.categorie,
      country: req.body.country,
      available: req.body.available,
    });
    try {
      const response = await newChannel.save();
      res.json({ message: "Channel created", new_channel: response });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  modifyChannel = async (req, res) => {
    const _id = req.params.idChannel;
    const modif = req.body;
    try {
      const response = await ChannelModel.findByIdAndUpdate(_id, modif);
      res.json({ message: "Channel modified", modified_channel: response });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

  deleteChannel = async (req, res) => {
    const _id = req.params.idChannel;
    try {
      const response = await ChannelModel.findByIdAndDelete(_id);
      res.json({ message: "Channel deleted", deleted_channels: response });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },

}