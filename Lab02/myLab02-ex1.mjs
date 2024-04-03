import sqlit from 'sqlite3';
import dayjs from 'dayjs'
import Film from './Film.mjs';
import FilmLibrary from './FilmLibrary.mjs';



function FilmLibrary() {

    this.getFilms = () => {

        const sql = ``
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {

                if (err) throw err
                else
                    resolve(mapRowToFilm(rows))
            })
        })


    }


}




const Library = new FilmLibrary();
Library.getFilms().then((rows) => { console.log(rows); })
