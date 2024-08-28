
const URL = 'http://localhost:3000/api/';

export default function API() {

    this.loadFilms = async (filter) => {

        const query = filter ? `?filter=${filter}` : ''

        const response = await fetch(`${URL}films${query}`)
        const films = await response.json()
        return films

    }

}

