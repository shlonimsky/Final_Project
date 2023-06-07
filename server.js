import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import db from "./config/database.js";
import routerUsers from './routes/Users.js';
import routerCategories from "./routes/Categoties.js";
import routerTasks from "./routes/Tasks.js";
import routerCities from "./routes/Cities.js";
import routerOffers from "./routes/Offers.js";
import routerChat from "./routes/Chat.js";
import routerHelpersReviews from "./routes/HelpersReviews.js";
import routerImage from "./routes/Images.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));

// allow cross-origin requests from imageKit.io package
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(routerTasks)
app.use(routerUsers)
app.use(routerCategories)
app.use('/api',routerCities)
app.use(routerOffers)
app.use('/api', routerChat)
app.use('/api', routerHelpersReviews)
app.use('/sdk/imagekit', routerImage)




app.listen(process.env.PORT || 8080, () => console.log(`Run on port: ${process.env.PORT || 8080}`));

try{
    db.authenticate();
    console.log("Database connected");
} catch (err){
    console.log(err);
}

