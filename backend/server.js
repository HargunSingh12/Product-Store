import express from 'express'
import dotenv from 'dotenv';
import path from 'path'
import { connectDb } from './config/db.js';;
import productRoutes from './routes/product.routes.js';

dotenv.config()
const app = express();
app.use(express.json()) // allows us to accept json data in req.body

app.use('/api/products',productRoutes)
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    connectDb();
    console.log(`Server started at port ${PORT}`);
})