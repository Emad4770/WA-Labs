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