import dayjs from "dayjs"
import sqlit from 'sqlite3'
import Film from "./Film.mjs"


function mapRowToFilm(rows) {
    return rows.map((row) => { return new Film(row.id, row.title, row.isFavorite === 1, row.watchDate, row.rating, row.userId) })
}

export default function FilmLibrary() {

    const db = new sqlit.Database('films.db', (err) => {
        if (err) throw err
    })
    this.closeDB = () => {
        try {
            db.close()
        } catch (error) {
            console.error(`Impossible to colse the database! ${error}`);
        }


    }
    this.getAll = () => {
        const sql = `SELECT * FROM films`
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(mapRowToFilm(rows))
            })
        })
    }
    this.getFavs = () => {
        const sql = `SELECT * FROM films f
        WHERE f.isFavorite = 1`

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) reject(err)
                else resolve(mapRowToFilm(rows))
            })
        })
    }
    this.getWatchedToday = () => {
        const sql = `SELECT * FROM films f
        WHERE f.watchDate = ?`
        const today = dayjs().format('YYYY-MM-DD')
        return new Promise((resolve, reject) => {
            db.all(sql, [today], (err, rows) => {
                if (err) reject(err)
                else resolve(mapRowToFilm(rows))
            })
        })
    }
    this.getEarlier = (date) => {
        const sql = `SELECT * FROM films f 
        WHERE f.watchDate < ?`
        return new Promise((resolve, reject) => {
            db.all(sql, [date], (err, rows) => {
                if (err) reject(err)
                else resolve(mapRowToFilm(rows))
            })
        })
    }
    this.getHigherScore = (score) => {
        const sql = `SELECT * FROM films f 
        WHERE f.rating >= ?`
        return new Promise((resolve, reject) => {
            db.all(sql, [score], (err, rows) => {
                if (err) reject(err)
                else resolve(mapRowToFilm(rows))
            })
        })
    }
    this.getContainsString = (title) => {

        const sql = `SELECT * FROM films f 
        WHERE f.title LIKE ?`
        title = `%${title}%`
        return new Promise((resolve, reject) => {
            db.all(sql, [title], (err, rows) => {
                if (err) reject(err)
                else resolve(mapRowToFilm(rows))
            })
        })
    }

    /*   Part 2 */

    this.addNewFilm = (film) => {

        const sql = `INSERT INTO films (title,isFavorite,watchDate,rating,userId)
        values (?, ?, ?, ?, ?)`
        const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null
        let rating = undefined;

        if (film.score >= 1 && film.score <= 5) {
            rating = film.score
        } else {
            rating = null
        }

        return new Promise((resolve, reject) => {
            db.run(sql, [film.title, film.favorite ? 1 : 0, watchDate, rating, film.userId], function (err) {
                if (err)
                    reject(err)
                else
                    film.id = this.lastID
                resolve(film)
            })
        })

    }
    this.deleteFilm = (id) => {

        const sql = `DELETE FROM films 
        WHERE id = ?`

        return new Promise((resolve, reject) => {
            db.run(sql, [id], (err) => {
                if (err)
                    reject(err)
                else
                    resolve(true)
            })
        })
    }

    this.resetWatchedFilms = () => {

        const sql = `UPDATE films 
        set watchDate = NULL`

        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err)
                    reject(err)
                else
                    resolve(true)
            })
        })
    }
}


// const library = new FilmLibrary()
// const film1 = new Film(4, "Spider Man 3", true, null, 0, 1)
// library.getAll().then((rows) => { console.log(rows); })
// library.getFavs().then((rows) => { console.log(rows); })
// library.getWatchedToday().then((rows) => { console.log(rows); })
// library.getEarlier('2024-03-18').then((rows) => { console.log(rows); })
// library.getHigherScore(4.5).then((rows) => { console.log(rows); })
// library.getContainsString('2').then((rows) => { console.log(rows); })
// library.resetWatchedFilms().then()
// library.addNewFilm(film1).then()
// library.deleteFilm(11).then()


