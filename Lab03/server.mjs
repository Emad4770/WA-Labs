import express from 'express'
import morgan from 'morgan';
import { closeDB, getAllFilms, getFavoriteFilms, getLatestFilms, getTopRated } from './dao.mjs'
import dayjs from 'dayjs';

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

// Get best rated films
app.get('/films/tops', (req, res) => {
    getTopRated().then((f) => {
        res.json(f)
    })
})

// Get films watched in the last month
app.get('/films/lastmonth', (req, res) => {
    const currentDate = dayjs()
    const lastMonth = currentDate.subtract(1, 'month')
    getLatestFilms(currentDate, lastMonth).then((f) => {
        res.json(f)
    })
})



app.listen(3000, () => {
    console.log("Server is running!");
})