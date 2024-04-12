import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

// public directory
app.use(express.static('public'))

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static('node_modules/jquery/dist'))

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.listen(5001, () => console.log(`Servidor encendido http://localhost:${5001}`))