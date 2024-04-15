import Film from "./Film.mjs";
import sqlite from 'sqlite3'

const db = new sqlite.Database('films.db', (err) => {
    if (err)
        throw (err)
})

export function getAllFilms() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title FROM films`
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else if (rows.length == 0) {
                resolve({ error: "There are no films in the database, try again later!" })
            }
            else {
                const fList = rows.map((row) => { return new Film(row.id, row.title) })
                resolve(fList)
            }
        })
    })
}

export function getFavoriteFilms() {

    return new Promise((resolve, reject) => {

        const sql = `SELECT id, title, rating ,watchDate, userId FROM films f
        WHERE f.isFavorite = 1`

        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            if (rows.length == 0) {
                resolve({ error: "No favorite films found!" })
            }
            else {
                const films = rows.map((row) => { return new Film(row.id, row.title, 1, row.watchDate, row.rating, row.userId) })
                resolve(films)
            }
        })
    })
}
export function closeDB() {
    db.close()
}
