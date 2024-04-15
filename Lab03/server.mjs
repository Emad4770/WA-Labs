import express from 'express'
import morgan from 'morgan';
import { getAllFilms } from './dao.mjs'
const app = express();

app.use(morgan('common'))
app.use(express.json())

app.get('/films', (req, res) => {
    getAllFilms().then((f) => {
        const films = f.map(element => {
            return { id: element.id, title: element.title }
        });
        res.json(films)
    })
})


app.listen(3000, () => {
    console.log("Server is running!");
})