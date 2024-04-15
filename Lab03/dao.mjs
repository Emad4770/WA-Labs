import dayjs from "dayjs";
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

export function addNewFilm(newFilm) {

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO films(title,isFavorite,rating,watchDate,userId)
        VALUES (?,?,?,DATE(?),?)`
        db.run(sql, [newFilm.title, newFilm.favorite ? 1 : 0, newFilm.score, newFilm.watchDate.toISOString(), newFilm.userId], function (err) {
            if (err)
                reject(err)
            else
                resolve(new Film(this.lastID, newFilm.title, newFilm.isFavorite, newFilm.watchDate, newFilm.score, newFilm.userId))
        })
    })

}


export function closeDB() {
    db.close()
}
