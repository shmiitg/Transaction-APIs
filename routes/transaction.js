const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

router.get("/view", (req, res) => {
    try {
        // verify jwt for signed users
        const token = req.cookies.usertoken;
        if (!token) {
            return res.json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, "secretkey");
        const id = decoded.id;
        db.query("SELECT * FROM users WHERE id = '" + id + "'", async (err, result) => {
            if (err) {
                return res.json({ error: err });
            }
            if (!result.length) {
                // if no user exists
                return res.json({ error: "No user exists" });
            } else {
                res.json({ amount: result[0].amount });
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/credit", (req, res) => {
    try {
        // verify jwt for signed users
        const token = req.cookies.usertoken;
        if (!token) {
            return res.json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, "secretkey");
        const id = decoded.id;
        db.query("SELECT * FROM users WHERE id = '" + id + "'", async (err, result) => {
            if (err) {
                return res.json({ error: err });
            }
            if (!result.length) {
                // if no user exists
                return res.json({ error: "No user exists" });
            } else {
                // add the money to user account
                const totalAmount = result[0].amount + req.body.amount;
                db.query(
                    "UPDATE users SET amount = ? WHERE id = ?",
                    [totalAmount, id],
                    (err, result) => {
                        if (err) {
                            res.json({ error: err });
                        } else {
                            res.json({ amount: totalAmount });
                        }
                    }
                );
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/debit", (req, res) => {
    try {
        // verify jwt for signed users
        const token = req.cookies.usertoken;
        if (!token) {
            return res.json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, "secretkey");
        const id = decoded.id;
        db.query("SELECT * FROM users WHERE id = '" + id + "'", async (err, result) => {
            if (err) {
                return res.json({ error: err });
            }
            if (!result.length) {
                // if no user exists
                return res.json({ error: "No user exists" });
            } else {
                const totalAmount = result[0].amount - req.body.amount;
                if (totalAmount < 0) {
                    // if amount to debit > user account amount
                    return res.json({ error: "You don't have enough balance" });
                }
                db.query(
                    "UPDATE users SET amount = ? WHERE id = ?",
                    [result[0].amount - req.body.amount, id],
                    (err, result) => {
                        if (err) {
                            res.json({ error: err });
                        } else {
                            res.json({ amount: totalAmount });
                        }
                    }
                );
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
