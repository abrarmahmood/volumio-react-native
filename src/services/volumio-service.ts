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
}

export default new VolumioHttpService();
