import express from 'express'
import morgan from 'morgan';
import { updateFilm, addNewFilm, getAllFilms, getFavoriteFilms, getFilm, getLatestFilms, getTopRated, getUnseenFilms, updateRating, updateIsFavorite, deleteFilm } from './dao.mjs'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import Film from './Film.mjs'
import { body, param, validationResult } from 'express-validator';

dayjs.extend(utc)
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
    const currentDate = dayjs.utc()
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
app.put('/films/:id', param('id').isInt(),
    body('watchDate').isDate(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('userId').isInt(), (req, res) => {
        const errors = validationResult(req)
        const filmId = req.params.id

        if (errors.isEmpty()) {
            const updatedFilm = new Film(filmId, req.body.title, req.body.isFavorite, req.body.watchDate, req.body.rating, req.body.userId)
            updateFilm(updatedFilm).then((f) => {
                res.json(f)
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
        }
        else {
            res.status(422).json({ errors: errors.array() })
        }

    })

// Update rating of a film
app.put('/films/:id/rating', param('id').isInt(),
    body('rating').isInt({ min: 0, max: 5 }), (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            updateRating(req.params.id, req.body.rating).then((f) => {
                res.json(f)
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
        }
        else {
            res.json({ errors: errors.array() })
        }
    })

// Mark a film as favorite/unfavorite
app.put('/films/:id/isfavorite', param('id').isInt(), (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        updateIsFavorite(req.params.id, req.body.isFavorite).then((f) => {
            res.json(f)
        }).catch((err) => {
            res.status(500).json({ error: err })
        })
    }
    else {
        res.status(422).json({ errors: errors.array() })
    }
})

// Delete a film
app.get('/films/:id/delete', param('id').isInt(), (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        deleteFilm(req.params.id).then((f) => {
            res.json(f)
        }).catch((err) => {
            res.status(500).json({ error: err })
        })
    }
    else {
        res.status(422).json({ errors: errors.array() })
    }
})



app.listen(3000, () => {
    console.log("Server is running!");
})