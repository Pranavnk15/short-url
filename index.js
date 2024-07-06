const express = require('express');
const { connectToMongoDB } = require('./connection');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const path = require('path');
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

//connect
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"));

app.set("view engine", "ejs");

app.set('views', path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/url', urlRoute);
app.use("/", staticRoute);

app.get("/test", async(req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
})

app.listen(PORT, ()=> console.log(`Server started on Port: ${PORT}`));