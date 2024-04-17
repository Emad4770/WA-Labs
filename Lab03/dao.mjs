import Film from "./Film.mjs";
import sqlite from 'sqlite3'

const db = new sqlite.Database('films.db', (err) => {
    if (err)
        throw (err)
})

function rowsToFilm(rows) {
    const films = rows.map((row) => { return new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId) })
    return films;
}

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
                const fList = rowsToFilm(rows)
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

export function getTopRated() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title, isFavorite, watchDate, rating, userId FROM films
        WHERE rating = 5`
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else if (rows.length == 0) {
                resolve({ error: "No movies found!" })
            }
            else {
                const films = rowsToFilm(rows)
                resolve(films)
            }
        })
    })
}

export function getLatestFilms(currentDate, lastMonth) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM films
        WHERE watchDate<= DATE(?) and watchDate >= DATE(?)`
        db.all(sql, [currentDate.toISOString(), lastMonth.toISOString()], (err, rows) => {
            if (err)
                reject(err)
            else if (rows.length == 0) {
                resolve({ error: "No films have been watched in the past month!" })
            }
            else {
                resolve(rowsToFilm(rows))
            }
        })
    })
}

export function getUnseenFilms() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM films
        WHERE watchDate IS NULL`
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else if (rows.length == 0) {
                resolve({ error: "No unseen films found!" })
            }
            else {
                resolve(rowsToFilm(rows))
            }
        })
    })
}

export function getFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM films
        WHERE id = ?`
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err)
            else if (row === undefined) {
                resolve({ error: "No films found with this id, try again!" })
            }
            else {
                resolve(new Film(row.id, row.title, row.isFavorite, row.watchDate, row.rating, row.userId))
            }
        })
    })
}

export function addNewFilm(film) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT u.id FROM users u, films f
        WHERE u.id = f.userId AND f.userId = ?`
        db.get(sql, [film.userId], (err, row) => {
            if (err)
                reject(err)
            else if (row === undefined) {
                resolve({ error: "This User Id doesn't exist in the Database!" })
            }
            else {
                const sql = `INSERT INTO films(title,isFavorite,rating,watchDate,userId)
            VALUES (?,?,?,DATE(?),?)`
                db.run(sql, [film.title, film.favorite ? 1 : 0, film.score, film.watchDate.toISOString(), film.userId], function (err) {
                    if (err)
                        reject(err)
                    else
                        resolve(new Film(this.lastID, film.title, film.isFavorite, film.watchDate.toISOString(), film.score, film.userId))
                })
            }
        })
    })

}

export function updateFilm(film) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT f.id from films f
        WHERE f.id = ? and ? IN(SELECT id FROM users)`
        db.get(sql, [film.id, film.userId], (err, row) => {
            if (err)
                reject(err)
            else if (row === undefined)
                resolve({ error: "Film ID and / or User ID not found, try again!" })
            else {
                const sql = `UPDATE films SET 
                title = ?, isFavorite = ?,rating = ?, watchDate=DATE(?), userId=?
                WHERE id = ?`
                console.log(film.id);
                db.run(sql, [film.title, film.favorite ? 1 : 0, film.score, film.watchDate.toISOString(), film.userId, film.id,], function (err) {
                    if (err)
                        reject(err)
                    else
                        resolve(new Film(film.id, film.title, film.isFavorite, film.watchDate.toISOString(), film.score, film.userId))
                })
            }
        })

    })
}

export function updateRating(filmId, rating) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT id FROM films
        WHERE id = ?`
        db.get(sql, [filmId], (err, row) => {
            if (err)
                reject(err)
            else if (row === undefined)
                resolve({ error: "No films found with the given ID!" })
            else {
                const sql = `UPDATE films SET
                rating = ? WHERE id = ?`
                db.run(sql, [rating, filmId], function (err) {
                    if (err)
                        reject(err)
                    else
                        resolve({ id: filmId, score: rating })
                })
            }
        })



    })
}


export function closeDB() {
    db.close()
}
