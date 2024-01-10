import express from 'express'
import ProductManager from '../files/product.json'

const productManager = new ProductManager('../files/products.json')

console.log(await productManager.getProducts())

const PORT = 8080
const app = express()

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const products = await productManager.getProducts()

app.get('/products', async (req, res) => {
    const limit = req.query.limit
    
    if(!limit || limit > products.length || limit <= 0) {
        res.json({products: products})     
    }else{
        res.json({products: products.slice(0, limit)})
    }
})

app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid
    const product = products.find((p) => p.id === parseInt(productId))

    if(!product){
        res.json({error: 'producto no encontrado'})
    }else{
        res.json({product: product})
    }
})