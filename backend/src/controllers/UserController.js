const UserService = require("../services/UserService");
const userService = require("../services/UserService");
const bcrypt = require("bcryptjs");

module.exports = {
  
  findAll: async (req, res) => {
    try {
      
      let users = await userService.findAll(req.userId);

      res.json(users);
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
        return res.status(422).json({ msg: "Email is required" });
      }
      if (!password) {
        return res.status(422).json({ msg: "Password is required" });
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
      let userId = req.userId;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let telephone = req.body.telephone;
      let cep = req.body.cep;
      let address = req.body.address;

      let result = await UserService.update(userId, firstName, lastName, telephone, cep, address);
      // Verificando o resultado da atualização
      if (result) {
        res.json({ update: true });
      } else {
        res.json({ update: false });
      }
    } catch (error) {
      console.error("Error in update controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  updateFilename: async (req, res) => {
    try {
      let userId = req.userId;
      let filename = req.file.originalname;     

      let result = await UserService.updateFilename(userId, filename);
      
      // Verificando o resultado da atualização
      if (result) {
        res.json({ update: true });
      } else {
        res.json({ update: false });
      }
    } catch (error) {
      console.error("Error in update controller:", error);
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
      return res.status(422).json({ msg: "Email is required" });
    }
    if (!password) {
      return res.status(422).json({ msg: "Password is required" });
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

  getPublications: async (req, res) => {
    try {
      
      let publications = await userService.getPublications();

      res.json(publications);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error"});
    }
  },

  getUserPublications: async (req, res) => {
    try {
      let userId = req.userId;
      let publications = await userService.getUserPublications(userId);

      res.json(publications);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error"});
    }
  },

  postPublication: async (req, res) => {
    try {
      let userId = req.userId;

      let petFileName = req.body.petFileName;
      let petName = req.body.petName;
      let petRace = req.body.petRace;
      let petSpecies = req.body.petSpecies;
      let petSex = req.body.petSex;
      let status = req.body.status;
      let petLastLocation = req.body.petLastLocation;
      
      let publication = await userService.postPublication(userId, petFileName, petName, petRace, petSex, petLastLocation, status, petSpecies);

      res.json(publication);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error"});
    }
  },
};
