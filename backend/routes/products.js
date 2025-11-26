import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ADD PRODUCT
router.post("/add", async (req, res) => {
    try {
        const { name, category, sub1, sub2, description, price, link, color, size, company } = req.body;

        await db.query(
            `INSERT INTO products 
            (name, category, sub1, sub2, description, price, link, color, size, company)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, category, sub1, sub2, description, price, link, color, size, company]
        );

        res.json({ success: true, message: "Product added successfully" });
    } catch (err) {
        res.json({ success: false, message: "Database Error", error: err });
    }
});


// GET ALL PRODUCTS
router.get("/", asimport express from "express";
import db from "../config/db.js";

const router = express.Router();

// ADD PRODUCT
router.post("/add", async (req, res) => {
    try {
        const { name, category, sub1, sub2, description, price, link, color, size, company } = req.body;

        await db.query(
            `INSERT INTO products 
            (name, category, sub1, sub2, description, price, link, color, size, company)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, category, sub1, sub2, description, price, link, color, size, company]
        );

        res.json({ success: true, message: "Product added successfully" });
    } catch (err) {
        res.json({ success: false, message: "Database Error", error: err });
    }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (err) {
        res.json({ success: false, message: "Database Error", error: err });
    }
});

export default router;
ync (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (err) {
        res.json({ success: false, message: "Database Error", error: err });
    }
});

export default router;
