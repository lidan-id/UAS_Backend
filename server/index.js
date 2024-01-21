const express = require("express");
const app = express();
const cors = require("cors");

const bikesAdmin = require("./routers/bikesadmin");
const authorization = require("./routers/authorization");
app.use(express.json());
app.use(cors());
const sqlite3 = require("sqlite3");

app.use((req, res, next) => {
  const db = new sqlite3.Database("sewapeda.db");
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS bikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT,
        brand TEXT,
        kategori TEXT,
        harga INTEGER
      )
    `);

    req.db = db;
  });
  next();
});

// Tabel customers
// db.run(`
//   CREATE TABLE IF NOT EXISTS customers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     frekuensi INTERGER
//   )
// `);
app.use(bikesAdmin);
app.use(authorization);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
