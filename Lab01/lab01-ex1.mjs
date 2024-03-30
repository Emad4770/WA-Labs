import dayjs from 'dayjs'
function Film(id, title, favorite = false, watchDate = null, score = 0, userId = 1) {

    this.id = id;
    this.title = title;
    this.favorite = favorite;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);
    this.score = score;
    this.userId = userId;
    this.toString = () => {

        return (`Id: ${this.id}, ` +
            `Title: ${this.title}, ` + `Favorite: ${this.favorite}, ` +
            `Date Watched: ${this.watchDate}, ` + `Rating: ${this.score}, ` +
            `User Id: ${this.userId}`)
    }

}

function FilmLibrary() {

    this.filmsList = []
    this.addNewFilm = (film) => {

        if (this.filmsList.some((f) => film.id == f.id)) {
            throw new Error(`Duplcate ID`)
        }
        else {
            this.filmsList.push(film)
        }
    }

}



function main() {
    const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
    const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
    const starWars = new Film(3, "Star Wars", false);
    const matrix = new Film(4, "Matrix");
    const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);

    const library = new FilmLibrary();
    library.addNewFilm(grams21);
    library.addNewFilm(starWars);
    library.addNewFilm(pulpFiction);
    library.addNewFilm(matrix);
    library.addNewFilm(shrek);


    // Print Films
    console.log("***** List of films *****");
    library.list.forEach((item) => console.log(item.toString()));

}

main();