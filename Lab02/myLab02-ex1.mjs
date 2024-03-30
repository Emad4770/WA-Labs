import { log } from 'console';
import sqlit from 'sqlite3';

const db = new sqlit.Database('films.db', (err) => { if (err) throw err });
let result = []
db.all('SELECT * FROM users', (err, rows) => {

    if (err)
        throw err
    // console.log(rows)
    // rows.forEach(r => { console.log(r.name); })

    for (let row of rows) {
        result.push(row)
    }
})

for (let row of result) {
    console.log(row);
}