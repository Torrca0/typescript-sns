const express = require("express");
const mongoose = require("mongoose");
const userRoute =require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts")
const PORT :number = 3000;

const app = express();

app.use(express.json());
app.use("/apt/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/apt/posts", postsRoute);
app.listen(PORT, () => console.log("starting server"));


