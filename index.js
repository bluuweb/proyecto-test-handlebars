import express from 'express';
import { engine } from 'express-handlebars';

import { services } from './data/services.data.js'
import path from 'path'

const app = express();

const __dirname = import.meta.dirname;

// public directory
app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    return res.render('home', { title: "Home Page 2.0" });
});

app.get('/services', (req, res) => {
    return res.render('services', { services: services });
});

app.get('/services/:name', (req, res) => {

    const nameURL = req.params.name // qa

    // cómo buscar algo de un array? re: find (/services/qa)
    const service = services.find((item) => item.url === `/services/${nameURL}`)

    // undefined
    if (!service) {
        return res.render('404', { title: "No se encuentra el servicio" })
    }

    return res.render('service', { service })
});

// 404 para cualquier otra ruta
app.get('*', (req, res) => {
    return res.status(404).render('404', { title: "No se encuentra la página" })
})

app.listen(5001, () => console.log(`Servidor encendido http://localhost:${5001}`))