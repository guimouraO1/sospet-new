const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variaveis.env" });

module.exports = {
  
  findAll: (userId) => {
    return new Promise((accept, reject) => {
      db.query("SELECT user.id, user.email, user.firstName, user.filename FROM user WHERE id != ?", [ userId ], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accept(results);
      });
    });
  },

  getUserById: (id) => {
    return new Promise((accept, reject) => {
      db.query(
        "SELECT user.id, user.firstName, user.lastName, user.cep, user.address, user.telephone, user.filename FROM user WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            accept(results[0]);
          } else {
            reject(false);
          }
        }
      );
    });
  },

  findUserByEmail: (email) => {
    return new Promise((accept, reject) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            accept(results[0]);
          } else {
            accept(false);
          }
        }
      );
    });
  },

  register: (email, password) => {
    return new Promise((accept, reject) => {
      db.query(
        "INSERT INTO `user` (`email`, `password`) VALUES (?, ?)",
        [email, password],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          
          accept({ register: true });
        }
      );
    });
  },
  
  update: (id, firstName, lastName, telephone, cep, address) => {
    return new Promise((accept, reject) => {
      db.query(
        "UPDATE user SET firstName = ?, lastName = ?, telephone = ?, cep = ?, address = ? WHERE id = ?",
        [firstName, lastName, telephone, cep, address, id],
        (error, results) => {
          if (error) {
            // console.error("Error updating user:", error);
            reject(error);
            return;
          }
          // console.log("User updated successfully");
          accept(results);
        }
      );
    });
  },
  
  delete: (id) => {
    return new Promise((accept, reject) => {
      db.query("DELETE FROM user WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accept(results);
      });
    });
  },

  login: (email, password) => {
    const SECRET = process.env.SECRET;

    return new Promise((accept, reject) => {
      db.query(
        "SELECT user.id, user.email FROM user WHERE email = ? AND password = ?",
        [email, password],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            let payload = { userId: results[0].id };
            let token = jwt.sign(payload, SECRET, { expiresIn: '30d' });
            accept({ user: results[0], token });
          } else {
            reject();
          }
        }
      );
    });
  },

  updateFilename: (id, filename) => {
    return new Promise((accept, reject) => {
      db.query(
        "UPDATE user SET filename = ? WHERE id = ?",
        [filename, id],
        (error, results) => {
          if (error) {
            console.error("Error updating user image:", error);
            reject(error);
            return;
          }
          console.log("User image updated successfully");
          accept(results);
        }
      );
    });
  },
  
  getPublications: () => {
    return new Promise((accept, reject) => {
      db.query(
        "SELECT publications.*, user.filename AS user_filename, user.firstName AS user_first_name FROM publications JOIN user ON publications.user_id = user.id;",
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          accept(results);
        }
      );
    });
  },

  getUserPublications: (userId) => {
    return new Promise((accept, reject) => {
      db.query(
        "SELECT publications.*, user.filename AS user_filename, user.firstName AS user_first_name FROM publications JOIN user ON publications.user_id = user.id WHERE user.id = ?;", 
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          accept(results);
        }
      );
    });
  },

  postPublication: (userId, petFileName, petName, petRace, petSex, petLastLocation, status, petSpecies) => {
    return new Promise((accept, reject) => {
      db.query(
        "INSERT INTO `publications` (`user_id`, `pet_filename`, `pet_name`, `pet_race`, `pet_species`, `pet_sex`, `status`, `pet_last_location`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [userId, petFileName, petName, petRace, petSpecies, petSex, status, petLastLocation],
        (error, results) => {
          if (error) {
            console.error(error); // Adicione essa linha para logar o erro no console
            reject(error);
            return;
          }
          accept(results);
        }
      );
    });
  },
};
