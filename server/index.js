const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { exportToExcel } = require('./controllers/exportController')
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer ayarları
const upload = multer({ dest: "uploads/" });

// Excel export endpoint'i
app.get('/api/export/:tableName', exportToExcel);

// CSV yükleme endpoint'i
app.post("/api/upload-csv", upload.single("csvFile"), async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        if (results.length > 0) {
          // Sütun isimlerini benzersiz yap
          const usedColumns = new Set();
          const columns = Object.keys(results[0]).map((column) => {
            let formatted = column
              .toLowerCase()
              .replace(/\s+/g, "_") // Boşlukları alt çizgi yap
              .replace(/[^a-z0-9_]/g, "") // Özel karakterleri kaldır
              .replace(/^[0-9]/, "n$&"); 

            // Eğer bu isim daha önce kullanıldıysa sonuna numara ekle
            let counter = 1;
            let originalFormatted = formatted;
            while (usedColumns.has(formatted)) {
              formatted = `${originalFormatted}_${counter}`;
              counter++;
            }
            usedColumns.add(formatted);

            return {
              original: column,
              formatted: formatted,
            };
          });

          const tableName = "imported_csv_" + Date.now();

          // Tablo oluştur
          const createTableQuery = `CREATE TABLE ${tableName} (${columns
            .map((col) => `"${col.formatted}" TEXT`)
            .join(", ")})`;

          await pool.query(createTableQuery);

          // Verileri ekle
          for (const row of results) {
            const values = columns.map((col) => row[col.original]);
            const insertQuery = `
              INSERT INTO ${tableName} (${columns
              .map((col) => `"${col.formatted}"`)
              .join(", ")})
              VALUES (${columns.map((_, i) => `$${i + 1}`).join(", ")})
            `;
            await pool.query(insertQuery, values);
          }

          fs.unlinkSync(req.file.path);

          res.json({
            success: true,
            message: "CSV başarıyla içe aktarıldı",
            tableName: tableName,
            columns: columns,
          });
        }
      });
  } catch (error) {
    console.error(error.message);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mevcut Products tablosu için endpoint
app.get("/api/veriler", async (req, res) => {
  try {
    const tumVeriler = await pool.query('SELECT * FROM "Products"');
    res.json(tumVeriler.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Users tablosu için endpoint
app.get("/api/veriler3", async (req, res) => {
  try {
    const tumVeriler3 = await pool.query('SELECT * FROM "Users"');
    res.json(tumVeriler3.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Expenses tablosu için endpoint
app.get("/api/veriler4", async (req, res) => {
  try {
    const tumVeriler4 = await pool.query('SELECT * FROM "Expenses"');
    res.json(tumVeriler4.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Urunler tablosu için endpoint
app.get("/api/urunler", async (req, res) => {
  try {
    const urunler = await pool.query('SELECT * FROM "urunler"');
    res.json(urunler.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Sales tablosu için endpoint
app.get("/api/veriler2", async (req, res) => {
  try {
    const tumVeriler2 = await pool.query('SELECT * FROM "Sales"');
    res.json(tumVeriler2.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/shoes", async (req, res) => {
  try {
    const shoes = await pool.query(
      'SELECT * FROM "imported_csv_1734296924183"'
    );
    res.json(shoes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Ürün ekleme endpoint'i
app.post("/api/veriler", async (req, res) => {
  try {
    const { name, price, rating, stockQuantity } = req.body;
    
    // Mevcut en yüksek productId'yi bulalım
    const maxIdResult = await pool.query('SELECT MAX("productId") FROM "Products"');
    const nextId = (maxIdResult.rows[0].max || 0) + 1;

    // Yeni ürünü ekleyelim
    const newProduct = await pool.query(
      'INSERT INTO "Products" ("productId", name, price, rating, "stockQuantity") VALUES($1, $2, $3, $4, $5) RETURNING *',
      [nextId, name, price, rating, stockQuantity]
    );
    
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      error: err.message,
      detail: "Ürün eklenirken bir hata oluştu. Lütfen tüm alanları doğru formatta doldurun."
    });
  }
});

// Server'ı başlat
const PORT = process.env.PORT || 5000;  // .env'de PORT yoksa 5000'i kullan
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
