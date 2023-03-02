const router = require("express").Router();
const User = require("../models/user.js");

router
  .get("/all", async (req, res) => {
    console.log("GET /users/all");
    try {
      const allUsers = await User.find();
      console.log(allUsers);
      res.status(200).send({ allUsers });
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET /user" + id);
    try {
      const user = await User.findById(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .post("/new", async (req, res) => {
    const { body } = req;
    console.log("POST /user/new");
    try {
      const newUser = new User(body);
      await newUser.save();
      res.status(200).json(newUser);
      console.log("ADD id " + newUser._id);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { ...resto } = req.body;
    console.log("PUT /user" + id);
    try {
      const editUser = await User.findByIdAndUpdate(id, resto, {
        new: true,
      });
      res.status(200).json(editUser);
      console.log("Moddified User " + editUser);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Delete /user" + id);
    try {
      const deleteUser = await User.findByIdAndDelete(id);
      res.status(200).json(deleteUser);
      console.log("User Deleted " + deleteUser);
    } catch (error) {
      res.status(404).json(error);
    }
  });
module.exports = router;
