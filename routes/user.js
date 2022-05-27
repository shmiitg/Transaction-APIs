const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "All fields required" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const amount = 0;
        db.query("SELECT * FROM users WHERE email = '" + email + "'", (err, result) => {
            if (err) {
                return res.status(401).json({ error: "Some error occured" });
            }
            if (result.length) {
                res.status(409).json({ error: "User already exists" });
            } else {
                db.query(
                    "INSERT INTO users (email, password, amount) VALUES (?,?,?)",
                    [email, hashedPassword, amount],
                    (err, result) => {
                        if (err) {
                            return res.json({ error: err });
                        }
                        res.status(200).json({ success: result });
                    }
                );
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "All fields required" });
    }
    try {
        db.query("SELECT * FROM users WHERE email = '" + email + "'", async (err, result) => {
            if (err) {
                return res.json({ error: err });
            }
            if (result.length) {
                const validated = await bcrypt.compare(password, result[0].password);
                if (!validated) {
                    return res.status(400).json({ error: "Invalid Credentials" });
                }
                const token = jwt.sign({ id: result[0].id }, "secretkey", {
                    expiresIn: 24 * 60 * 60 * 1000,
                });
                res.cookie("usertoken", token, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    httpOnly: true,
                })
                    .status(200)
                    .json({ success: token });
            } else {
                res.status(409).json({ error: "User already exists" });
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
