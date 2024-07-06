const express = require('express');
const { connectToMongoDB } = require('./connection');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const path = require('path');
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth');


const app = express();
const PORT = 8001;

//connect
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"));

app.set("view engine", "ejs");

app.set('views', path.resolve("./views"));


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

//Routes
//inline middleware, this will only run when the req comes to this url
app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth , staticRoute);
app.use("/user", userRoute)

// app.get("/test", async(req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls: allUrls,
//     });
// })

app.listen(PORT, ()=> console.log(`Server started on Port: ${PORT}`));