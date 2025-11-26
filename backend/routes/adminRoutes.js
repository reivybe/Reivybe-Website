import express from "express";
import db from "../db.js";

console.log("Admin Routes file is being loaded! 🚀");

const router = express.Router();

// Admin Login API
router.post("/login", (req, res) => {

  console.log("Login API hit");     
        
  console.log("Request body:", req.body); // see what frontend is sending
  
  const { username, password } = req.body;

  // ✅ This is where your SQL query goes
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";

  
  // Execute the query
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length > 0) {
      res.json({ success: true, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  });
});

export default router;


