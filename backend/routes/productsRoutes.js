import express from "express";
import db from "../db.js";

const router = express.Router();

// ADD PRODUCT
router.post("/add", (req, res) => {
  const {
    name,
    category,
    sub1,
    sub2,
    description,
    price,
    link,
    color,
    size,
    company,
    image
  } = req.body;

  const sql = `
    INSERT INTO products
    (name, category, sub1, sub2, description, price, link, color, size, company, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, category, sub1, sub2, description, price, link, color, size, company, image], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ success: true, message: "Product added successfully" });
    }
  );
});

// GET ALL PRODUCTS
router.get("/all", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
});

export default router;

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Product deleted!" });
  });
});
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const sql = `
    UPDATE products 
    SET name=?, category=?, sub1=?, sub2=?, description=?, price=?, link=?, color=?, size=?, company=?
    WHERE id=?
  `;

  db.query(sql, [
    data.name, data.category, data.sub1, data.sub2, data.description,
    data.price, data.link, data.color, data.size, data.company, id
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Product updated!" });
  });
});
