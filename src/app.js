import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";

const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"));
app.use(cookieParser());


import ownersRouter from './routes/owner.Router.js'
import usersRouter from './routes/user.Router.js'
import productsRouter from './routes/product.Router.js'

app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter)



export {app};