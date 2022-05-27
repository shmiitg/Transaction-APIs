require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const user = require("./routes/user");
const transaction = require("./routes/transaction");

app.use(express.json());
app.use(cookieParser());

app.use("/user", user);
app.use("/transaction", transaction);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
