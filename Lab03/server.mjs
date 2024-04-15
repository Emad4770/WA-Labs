import express from 'express'
import morgan from 'morgan';
import { getAllFilms } from './dao.mjs'
const app = express();

app.use(morgan('common'))
app.use(express.json())

app.get('/films', (req, res) => {
    getAllFilms().then((f) => {
        if (!f.error) {
            const films = f.map(element => {
                return { id: element.id, title: element.title }
            });
            res.json(films)
        }
        else {
            res.json(f)
        }
    })
})


app.listen(3000, () => {
    console.log("Server is running!");
})