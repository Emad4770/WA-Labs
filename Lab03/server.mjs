import express from 'express'
import morgan from 'morgan';
import { closeDB, getAllFilms, getFavoriteFilms, getFilm, getLatestFilms, getTopRated, getUnseenFilms } from './dao.mjs'
import dayjs from 'dayjs';
import { check, validationResult } from 'express-validator';

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
    }).catch((err) => {
        res.status(500).json({ error: err.message })
    })
})

// Get all the favorite films
app.get('/films/favorites', (req, res) => {
    getFavoriteFilms().then((f) => {
        res.json(f)
    }).catch((err) => {
        res.status(500).json({ error: err.message })
    })
})

// Get best rated films
app.get('/films/tops', (req, res) => {
    getTopRated().then((f) => {
        res.json(f)
    }).catch((err) => {
        res.status(500).json({ error: err.message })
    })
})

// Get films watched in the last month
app.get('/films/lastmonth', (req, res) => {
    const currentDate = dayjs()
    const lastMonth = currentDate.subtract(1, 'month')
    getLatestFilms(currentDate, lastMonth).then((f) => {
        res.json(f)
    }).catch((err) => {
        res.status(500).json({ error: err.message })
    })
})

// Get all unseen films
app.get('/films/unseen', (req, res) => {
    getUnseenFilms().then((f) => {
        res.json(f)
    }).catch((err) => {
        res.status(500).json({ error: err.message })
    })

})

// Get a specific film
app.get('/films/:id', (req, res) => {
    const filmId = req.params.id
    getFilm(filmId).then((f) => {
        res.json(f)
    })
})

// Create a new film
app.post('/films', (req, res) => {

})





app.listen(3000, () => {
    console.log("Server is running!");
})