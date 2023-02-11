const express = require("express");
const mongoose = require("mongoose");
const userRoute =require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const PORT :number = 3000;
require("dotenv").config();

const app = express();

mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
        console.log("connecting DB");
    })
    .catch((err :any) => {
        console.log("error");
    });

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.listen(PORT, () => console.log("starting server"));


