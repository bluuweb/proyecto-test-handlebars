import path from 'path'
import { Router } from "express";
import { writeFile } from 'fs/promises';

const router = Router()

const __dirname = import.meta.dirname;

// PATH /archivos

router.get('/', (req, res) => {
    return res.render('archivos')
})

// crear los archivos
router.post('/crear', async (req, res) => {

    // req.body

    try {
        const ruta = path.join(__dirname, `../data/archivos/nuevo-archivo.txt`)
        // crear un archivo
        await writeFile(ruta, "este es el contenido del archivo")

        return res.redirect('/archivos')
    } catch (error) {
        console.log(error)
        return res.redirect('/archivos')
    }

})

export default router;