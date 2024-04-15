import express from 'express'
import morgan from 'morgan';
import { closeDB, getAllFilms, getFavoriteFilms } from './dao.mjs'
const app = express();

app.use(morgan('common'))
app.use(express.json())

// Get a list of all films
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

// Get all the favorite films
app.get('/films/favorites', (req, res) => {
    getFavoriteFilms().then((f) => {
        res.json(f)
    })
})



app.listen(3000, () => {
    console.log("Server is running!");
})