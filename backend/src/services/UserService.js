const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variaveis.env" });

module.exports = {
  
  findAll: () => {
    return new Promise((accept, reject) => {
      db.query("SELECT * FROM user", (error, results) => {
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
        "SELECT user.id, user.email, user.firstName, user.lastName FROM user WHERE id = ?",
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
  
  update: (id, email, firstName, lastName) => {
    return new Promise((accept, reject) => {
      db.query(
        "UPDATE user SET email = ?, firstName = ?, lastName = ? WHERE id = ?",
        [email, firstName, lastName, id],
        (error, results) => {
          if (error) {
            console.error("Error updating user:", error);
            reject(error);
            return;
          }
          console.log("User updated successfully");
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
  

};
