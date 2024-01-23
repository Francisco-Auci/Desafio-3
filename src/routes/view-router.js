import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"
import socketServer from "../app.js"

const productManager = new ProductManager('./src/files/products.json')

const router = Router()

router.get("/home", async (req,res) =>{
    const products = await productManager.getProducts()
    res.render('home', {products})
})

router.get("/realTimeProducts", async (req,res) =>{
    res.render('realTimeProducts', {})
})

export {router as viewRouter} 