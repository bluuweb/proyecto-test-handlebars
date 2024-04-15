import { Router } from 'express'
import { products } from '../data/products.data.js'

const router = Router()

// PATH: '/products'

router.get('/', (req, res) => {

    // leer queries
    const { order, search, limit } = req.query

    if (order === 'asc') {
        products.sort((a, b) => a.price - b.price)
    }

    if (order === 'desc') {
        products.sort((a, b) => b.price - a.price)
        console.log(products)
    }

    res.render('products', { products })
})

router.post('/', (req, res) => {

    const { name, price } = req.body

    // tarea: Agregar el producto al array de products.

    res.render('products', { products })
})

// actualizar y eliminar : POST o GET

export default router;