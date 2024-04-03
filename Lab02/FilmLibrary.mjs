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







    /*   Exercise 2 */

    this.filmsList = []
    this.addNewFilm = (film) => {

        if (this.filmsList.some((f) => film.id == f.id)) {
            throw new Error(`Duplcate ID`)
        }
        else {
            this.filmsList.push(film)
        }
    }
    this.sortByDate = () => {
        let newList = [...this.filmsList];
        return newList.sort((a, b) => {

            if (a.watchDate == null)
                return 1;
            else if (b.watchDate == null)
                return -1;
            else if (a.watchDate.isAfter(b.watchDate))
                return 1;
            else if (a.watchDate.isBefore(b.watchDate))
                return -1;
            else return 0;

        })
    }
    this.deleteFilm = (id) => {
        // let index = this.filmsList.findIndex(f => f.id === dId)
        // index != -1 ? this.filmsList.splice(index, 1) : console.log('Not Found!');

        this.filmsList = this.filmsList.filter((f) => f.id !== id)
    }
    this.resetWatchedFilms = () => {
        this.filmsList.forEach((f) => delete f.watchDate)
    }
    this.getRated = () => {
        return this.filmsList.filter(f => f.score > 0).sort((a, b) => b.score - a.score)
    }
}


const library = new FilmLibrary()
// library.getAll().then((rows) => { console.log(rows); })
// library.getFavs().then((rows) => { console.log(rows); })
// library.getWatchedToday().then((rows) => { console.log(rows); })
// library.getEarlier('2024-03-18').then((rows) => { console.log(rows); })
// library.getHigherScore(4.5).then((rows) => { console.log(rows); })
library.getContainsString('2').then((rows) => { console.log(rows); })
