class VolumioHttpService {
    host: string;

    constructor() {
        this.host = '';
    }

    init(host: string) {
        this.host = host;
    }

    async search(term: string) {
        const response = await fetch(this.host + '/search?term=' + term)
        const json = await response.json();

        return json.navigation.lists;
    }

    async browse(type: string, id: string) {
        const response = await fetch(this.host + `/browse/${type}/${id}`)
        const json = await response.json();

        return json.navigation.lists;
    }
}

export default new VolumioHttpService();
