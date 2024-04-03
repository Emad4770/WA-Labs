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


    // Print Sorted films
    console.log("***** List of films (sorted) *****");
    const sortedFilms = library.sortByDate();
    sortedFilms.forEach((film) => console.log(film.toString()));

    // Deleting film #3
    library.deleteFilm(3);

    // Reset dates
    library.resetWatchedFilms();

    // Printing modified Library
    console.log("***** List of films *****");
    library.filmsList.forEach((item) => console.log(item.toString()));

    // Retrieve and print films with an assigned rating
    console.log("***** Films filtered, only the rated ones *****");
    const ratedFilms = library.getRated();
    ratedFilms.forEach((film) => console.log(film.toString()));

}

main();