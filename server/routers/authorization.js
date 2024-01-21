const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const SECRET_KEY = "keren";
const util = require("util");
const { decode } = require("punycode");
const signAsync = util.promisify(jwt.sign);
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "test.db"),
});
const Customer = sequelize.define("customer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  salt: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.STRING,
  },
});

async function createCustomer(username, password, salt, res) {
  try {
    await sequelize.sync();
    const customer = await Customer.create({
      username: username,
      password: password,
      salt: salt,
      token: "",
    });

    console.log("Pelanggan dibuat:", customer.toJSON());
    res.send("Berhasil membuat akun baru");
  } catch (error) {
    console.error("Kesalahan:", error);
  }
}
async function findCustomer(username) {
  try {
    await sequelize.sync();
    const customer = await Customer.findOne({
      where: {
        username: username,
      },
    });
    if (customer === null) {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return;
  }
}
// async function findAll() {
//   try {
//     await sequelize.sync();
//     const customer = await Customer.findAll();
//     return customer;
//   } catch (error) {
//     console.error("Error:", error);
//     return;
//   }
// }
async function CheckCustomerGetToken(username, password) {
  try {
    await sequelize.sync();
    const customer = await Customer.findOne({
      where: {
        username: username,
      },
    });
    if (customer === null) {
      return false;
    }
    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      return false;
    }
    const payload = {
      username: username,
      password: customer.password,
    };
    const token = await signAsync(payload, SECRET_KEY, { expiresIn: "1h" });
    await Customer.update(
      { token: token },
      {
        where: {
          username: username,
        },
      }
    );
    return token;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
}
async function checkIsCustomer(username, password) {
  try {
    await sequelize.sync();
    const customer = await Customer.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (customer === null) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
}
router.post("/checkToken", async (req, res) => {
  const token = req.headers.token;
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.send(false);
    }
    const IsCustomer = await checkIsCustomer(
      decoded.username,
      decoded.password
    );
    if (IsCustomer) {
      res.send(true);
      return;
    }
    res.send(false);
  });
});
router.post("/login", async (req, res) => {
  const username = req.body.username._value;
  const password = req.body.password._value;
  const customerToken = await CheckCustomerGetToken(username, password);
  res.send(customerToken);
  // const customers = await findAll();
  // console.log(customers);
});
router.post("/register", async (req, res) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const username = req.body.username._value;
  const password = req.body.password._value;
  const customer = await findCustomer(username);
  if (customer !== null) {
    res.send("Username sudah terpakai, gunakan username yang lain");
    return;
  }
  bcrypt.hash(password, salt, (err, result) => {
    if (err) {
      res.status(500).send("Ada masalah dengan server");
      return;
    }
    const hashPassword = result;
    createCustomer(username, hashPassword, salt, res);
  });
});
module.exports = router;

// async function signToken() {
//   return jwt.sign(payload, SECRET_KEY, async (err, token) => {
//     console.log("pertama");
//     if (err) {
//       res.status(500).send("Ada masalah dengan server");
//       return;
//     }
//     customer.token = token;
//     console.log("ini token", token);
//     console.log("ini password", customer.password);
//   });
// }
