import User from "../models/user.model.js";

const create = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select("name email created updated");
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

const read = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    const user = Object.assign(req.profile, req.body);
    user.updated = Date.now();
    await user.save();
    user.password = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.profile.deleteOne();
    res.json(deleted);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const removeAll = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, userByID, read, update, remove, removeAll };