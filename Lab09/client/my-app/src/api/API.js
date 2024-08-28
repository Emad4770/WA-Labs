
const URL = 'http://localhost:3000/api/';

export class API {

    async loadFilms(filter) {

        try {
            const query = filter ? `?filter=${filter}` : '';
            const response = await fetch(`${URL}films${query}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            let type = response.headers.get('Content-Type');
            if (type !== 'application/json') {
                throw new TypeError(`Expected JSON, got ${type}`);
            }
            const films = await response.json();
            return films;

        } catch (error) {
            console.error(error);
        }
    };

}

