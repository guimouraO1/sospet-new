const UserService = require("../services/UserService");
const userService = require("../services/UserService");
const bcrypt = require("bcryptjs");

module.exports = {
  
  findAll: async (req, res) => {
    try {
      let json = { error: "", result: [] };

      let users = await userService.findAll();

      for (let i in users) {
        json.result.push({
          id: users[i].id,
          email: users[i].email,
        });
      }
      res.json(json);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", result: [] });
    }
  },

  getUserById: async (req, res) => {
    try {
      let user = await UserService.getUserById(req.userId);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", result: {} });
    }
  },

  findUserByEmail: async (req, res) => {
    try {
      let email = req.body.email;
      let user = await UserService.findUserByEmail(email);

      if (user) {
        res.json(user);
      }
    } catch (error) {
      9;
      res.status(500).json({ error: "Internal Server Error", result: {} });
    }
  },

  register: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;

      if (!email) {
        return res.status(422).json({ msg: "Email is mandatory" });
      }
      if (!password) {
        return res.status(422).json({ msg: "Password is mandatory" });
      }
      if (password !== confirmPassword) {
        return res.status(422).json({ msg: "Passwords don't match" });
      }

      const userExists = await UserService.findUserByEmail(email);
      if (userExists) {
        return res
          .status(422)
          .json({ msg: "Email already registered, please try a different one." });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      let user = await UserService.register(email, passwordHash);

      res.json(user);
    } catch (error) {}
  },

  update: async (req, res) => {
    try {
      let id = req.userId;
      let email = req.body.email;
      let password = req.body.password;

      if (id && email && password) {
        await UserService.update(id, email, password);
        result = {
          update: true,
        };
      } else {
        result = {
          update: false,
        };
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  delete: async (req, res) => {
    try {
      await UserService.delete(req.params.id);

      res.json({ userId: req.params.id, delete: true });
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Error",
        result: { userId: req.params.id, delete: false },
      });
    }
  },

  login: async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email) {
      return res.status(422).json({ msg: "Email is mandatory" });
    }
    if (!password) {
      return res.status(422).json({ msg: "Password Email is mandatory" });
    }

    const userExists = await UserService.findUserByEmail(email);
    if (!userExists) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      return res.status(422).json({ msg: "Invalid password!" });
    }

    try {
      let user = await UserService.login(email, userExists.password);

      res.json(user);
    } catch (error) {
      json.error = "An error occurred during login";
      res.status(500).json(json);
    }
  },
};
