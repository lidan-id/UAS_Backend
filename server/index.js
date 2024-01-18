const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("sewapeda.db");
// Tabel bikes
db.run(`
  CREATE TABLE IF NOT EXISTS bikes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT,
    brand TEXT,
    kategori TEXT,
    harga INTEGER
  )
`);
// Tabel customers
// db.run(`
//   CREATE TABLE IF NOT EXISTS customers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     frekuensi INTERGER
//   )
// `);

app.get("/bikes", (req, res) => {
  db.all("SELECT * FROM bikes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ bikes: rows });
  });
});

app.post("/bikes", (req, res) => {
  const { nama, brand, kategori, harga } = req.body;
  if (!nama || !brand || !kategori || !harga) {
    res.status(400).json({ error: "Data sepeda tidak lengkap..." });
    return;
  }

  const q =
    "INSERT INTO bikes (nama, brand, kategori, harga) VALUES (?, ?, ?, ?)";
  const values = [nama, brand, kategori, harga];

  db.run(q, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Sepeda baru berhasil ditambahkan");
    res.json({ id: this.lastID, nama, brand, kategori, harga });
  });
});
// Put dan delete

// Endpoint untuk melihat tabel customers
// app.get("/customers", (req, res) => {
//   db.all("SELECT * FROM customers", (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ customers: rows });
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(`tes`);
});
