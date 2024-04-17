import express from 'express'
import morgan from 'morgan';
import { addNewFilm, closeDB, getAllFilms, getFavoriteFilms, getFilm, getLatestFilms, getTopRated, getUnseenFilms } from './dao.mjs'
import dayjs from 'dayjs';
import Film from './Film.mjs'
import { body, param, validationResult } from 'express-validator';

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
app.get('/films/:id', param('id').isInt(), (req, res) => {

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const filmId = req.params.id
        getFilm(filmId).then((f) => {
            res.json(f)
        })
    }
    else {
        res.status(422).json({ errors: errors.array() })
    }

})

// Create a new film
app.post('/films', body('watchDate').isDate(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('userId').isInt(),
    body(), (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const newFilm = new Film(1, req.body.title, req.body.isFavorite, req.body.watchDate, req.body.rating, req.body.userId)
            addNewFilm(newFilm).then((f) => {
                res.json(f)
            }).catch((err) => {
                res.status(500).json({ error: err.message })
            })
        }
        else {
            res.status(422).json({ errors: errors.array() })
        }
    })

// Update an existing film
app.put('/films/:id', (req, res) => {

})



app.listen(3000, () => {
    console.log("Server is running!");
})