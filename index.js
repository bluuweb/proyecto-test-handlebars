import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path'

import serviceRoutes from './routes/service.route.js'
import productRoutes from './routes/product.route.js'

const app = express();

const __dirname = import.meta.dirname;

// public directory
app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

// Middlewares body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));



app.get('/', (req, res) => {
    return res.render('home', { title: "Home Page 2.0" });
});

// Rutas middlewares
app.use('/services', serviceRoutes)
app.use('/products', productRoutes)

// 404 para cualquier otra ruta
app.get('*', (req, res) => {
    return res.status(404).render('404', { title: "No se encuentra la página" })
})

app.listen(5001, () => console.log(`Servidor encendido http://localhost:${5001}`))