// Tambah validasi cek id etc
const express = require("express");
const router = express.Router();

router.get("/bikes", (req, res) => {
  const db = req.db;
  db.all("SELECT * FROM bikes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ bikes: rows });
  });
});

router.post("/bikes", (req, res) => {
  const db = req.db;
  const { nama, brand, kategori, harga } = req.body;
  if (!nama || !brand || !kategori || !harga) {
    res.status(400).json({ error: "Data sepeda tidak lengkap..." });
    return;
  }

  //untuk cek data duplikat
  const checkQuery =
    "SELECT * FROM bikes WHERE nama = ? AND brand = ? AND kategori = ? AND harga = ? ";
  const checkValues = [nama, brand, kategori, harga];
  try {
    db.get(checkQuery, checkValues, (err, existingBike) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (existingBike) {
        return res.status(409).json({ error: "Tidak boleh duplikat" });
      }

      const insertQuery =
        "INSERT INTO bikes (nama, brand, kategori, harga) VALUES (?, ?, ?, ?)";
      const insertValues = [nama, brand, kategori, harga];

      db.run(insertQuery, insertValues, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        console.log("Bike added...");
        res.json({ id: this.lastID, nama, brand, kategori, harga });
      });
    });
  } catch (error) {
    console.error(error);
  }
});

router.put("/bikes/:id", (req, res) => {
  const db = req.db;
  const bikeId = parseInt(req.params.id);
  const { nama, brand, kategori, harga } = req.body;

  if (!nama || !brand || !kategori || !harga) {
    return res.status(400).json({ error: "Data sepeda tidak lengkap..." });
  }

  if (isNaN(bikeId) || bikeId <= 0) {
    return res.status(400).json({ error: "Sepeda tidak ditemukan" });
  }

  const updateQuery = `
      UPDATE bikes 
      SET nama = ?, brand = ?, kategori = ?, harga = ? 
      WHERE id = ?`;

  db.run(updateQuery, [nama, brand, kategori, harga, bikeId], (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Failed to update bike", errorMessage: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({
        error: "Data tidak tersedia / hilang",
      });
      return;
    }

    console.log(`Row(s) updated: ${this.changes}`);
    res.json({ message: "Bike edited..." });
  });
});

router.delete("/bikes/:id", (req, res) => {
  const db = req.db;
  const bikeId = parseInt(req.params.id);
  if (bikeId >= 1) {
    db.run("DELETE FROM bikes WHERE id = ?", bikeId, (err) => {
      if (err) {
        return console.error(err);
      }
      res.json({ message: "Bike deleted..." });
    });
    return;
  }
  res.status(404).json({ message: "Invalid id" });
});

module.exports = router;
