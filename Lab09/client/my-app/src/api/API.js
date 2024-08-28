
const URL = 'http://localhost:3000/api/';

export default function API() {

    this.loadFilms = async () => {

        const response = await fetch(`${URL}films`)
        const films = await response.json()
        return films

    }

    this.loadFavoriteFilms = async () => {

        const response = await fetch(`${URL}films?filter=filter-unseen`)
        const films = await response.json()
        return films

    }
}

