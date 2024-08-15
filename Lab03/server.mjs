import express from 'express'
import morgan from 'morgan';
// import { updateFilm, addNewFilm, getAllFilms, getFavoriteFilms, getFilm, getLatestFilms, getTopRated, getUnseenFilms, updateRating, updateIsFavorite, deleteFilm } from './dao.mjs'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'
import Film from './Film.mjs'
import { check, body, param, validationResult, checkSchema } from 'express-validator';
import FilmDao from './dao.mjs';

dayjs.extend(utc)
const app = express();
const filmDao = new FilmDao();

app.use(morgan('common'))
app.use(express.json())


// This function is used to handle validation errors
const onValidationErrors = (validationResult, res) => {
    const errors = validationResult.formatWith(errorFormatter);
    return res.status(422).json({ validationErrors: errors.mapped() });
};

// Only keep the error message in the response
const errorFormatter = ({ msg }) => {
    return msg;
};

const filmValidation = [
    check('title').isString().notEmpty(),
    check('favorite').isBoolean().optional(),
    check('watchDate').optional({ nullable: true }).isISO8601({ strict: true }).toDate(),
    check('score').optional({ nullable: true }).isInt({ min: 0, max: 5 }),
    check('userId').isInt()
]

/*** Films APIs ***/
// 1. Retrieve the list of all the available films.
// GET /api/films
// This route returns the FilmLibrary. It handles also "filter=?" query parameter
app.get('/api/films', async (req, res) => {
    try {
        const films = await filmDao.getFilms(req.query.filter)
        res.json(films)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

})

// Get all the favorite films
// app.get('/films/favorites', (req, res) => {
//     getFavoriteFilms().then((f) => {
//         res.json(f)
//     }).catch((err) => {
//         res.status(500).json({ error: err.message })
//     })
// })

// Get best rated films
// app.get('/films/tops', (req, res) => {
//     getTopRated().then((f) => {
//         res.json(f)
//     }).catch((err) => {
//         res.status(500).json({ error: err.message })
//     })
// })

// Get films watched in the last month
// app.get('/films/lastmonth', (req, res) => {
//     const currentDate = dayjs.utc()
//     const lastMonth = currentDate.subtract(1, 'month')
//     getLatestFilms(currentDate, lastMonth).then((f) => {
//         res.json(f)
//     }).catch((err) => {
//         res.status(500).json({ error: err.message })
//     })
// })

// Get all unseen films
// app.get('/films/unseen', (req, res) => {
//     getUnseenFilms().then((f) => {
//         res.json(f)
//     }).catch((err) => {
//         res.status(500).json({ error: err.message })
//     })

// })

// 2. Retrieve a film, given its "id".
// GET /api/films/<id>
// Given a film id, this route returns the associated film from the library.

app.get('/api/films/:id', param('id').isInt(), (req, res) => {


    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return onValidationErrors(errors, res);
    }
    else {
        const filmId = req.params.id
        filmDao.getFilm(filmId).then((f) => {
            res.json(f)
        })
    }


})

// Create a new film
app.post('/api/films', filmValidation, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return onValidationErrors(errors, res);
    }
    else {
        const newFilm = new Film(undefined, req.body.title, req.body.favorite, req.body.watchDate, req.body.rating, req.body.userId)
        filmDao.addNewFilm(newFilm).then((f) => {
            res.json(f)
        }).catch((err) => {
            res.status(500).json({ error: err.message })
        })
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