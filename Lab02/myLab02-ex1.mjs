import dayjs from 'dayjs'
import FilmLibrary from './FilmLibrary.mjs';

function printAll(films) {
    films.forEach(film => { console.log(film.toString()) });
}


async function main() {

    const library = new FilmLibrary();

    try {

        console.log("***** All films *****");
        const allFilms = await library.getAll();

        if (allFilms.length === 0) {
            console.log("***** There are no films, try again later! *****");
        } else {
            printAll(allFilms)
        }

        console.log("\n***** Favorite films *****");
        const favoriteFilms = await library.getFavs();
        if (favoriteFilms.length === 0) {
            console.log("***** There are no favorite films, try again later! *****");
        } else {
            printAll(favoriteFilms)
        }

        // 1c. get films watched today
        console.log('\n****** Films watched today ******');
        const watchedToday = await library.getWatchedToday();
        if (watchedToday.length === 0)
            console.log('No films watched today, time to watch one?');
        else
            printAll(watchedToday);

        // 1d. get films before a certain date
        const watchDateStr = '2024-03-25';
        const watchDate = dayjs(watchDateStr);
        console.log(`\n****** Films watched before ${watchDateStr}: ******`);
        const watchedBeforeDate = await library.getEarlier(watchDate);
        if (watchedBeforeDate.length === 0)
            console.log(`No films watched before ${watchDateStr}, sorry.`);
        else
            printAll(watchedBeforeDate);

        // 1e. get films with a rating greater than or equal to given rating
        const rating = 4
        console.log(`\n****** Films with a minimum rating of ${rating}: ******`);
        const ratedAbove = await library.getHigherScore(rating);
        if (ratedAbove.length === 0)
            console.log('No films with this rating, yet.');
        else
            printAll(ratedAbove);

        // 1f. get films containing string
        const searchString = 'war';
        console.log(`\n****** Films containing '${searchString}' in the title: ******`);
        const containingString = await library.getContainsString(searchString);
        if (containingString.length === 0)
            console.log(`No films with the word ${searchString} in the title...`);
        else
            printAll(containingString);

    } catch (error) {
        console.error(`Impossible to retrieve films! ${error}`)
        library.closeDB()
        return
    }

    library.closeDB()

}

main()
