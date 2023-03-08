const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

router
  // .get("/all", async (req, res) => {
  //   console.log("GET /users/all");
  //   try {
  //     const allUsers = await User.find();
  //     console.log(allUsers);
  //     res.status(200).send({ allUsers });
  //   } catch (error) {
  //     res.status(400).json(error);
  //   }
  // })
  .post("/login", async (req, res) => {
    const body = req.body;

    try {
      const user = await User.findOne({ mail: body.mail });

      const decryptedPassword = await bcrypt.compare(
        body.password,
        user.password
      );
      if (user && decryptedPassword) {
        return res
          .status(200)
          .json({ error: null, message: "User and pass OK", rol: user.rol });
      }
    } catch (error) {
      res.status(404).json({ error: true, message: "Credentians are WRONG" });
    }
  })
  .post("/register", async (req, res) => {
    const { body } = req;
    const userExists = await User.findOne({ mail: body.mail });
    if (userExists) {
      return res
        .status(400)
        .json({ error: true, message: "Mail already exist" });
    }
    const salt = await bcrypt.genSalt(6);
    const encryptedPassword = await bcrypt.hash(body.password, salt);

    try {
      const newUser = new User({
        name: body.name,
        mail: body.mail,
        rol: body.rol,
        salt: salt,
        password: encryptedPassword,
      });
      if (body.name === "admin") {
        return res.status(400).json({ message: "Admin are only one ;)" });
      }
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
      if (deleteUser.name === "admin") {
        return res
          .status(400)
          .json({ message: "Admin no puede ser eliminado" });
      }
      res.status(200).json(deleteUser);
      console.log("User Deleted " + deleteUser);
    } catch (error) {
      res.status(404).json(error);
    }
  });
module.exports = router;
