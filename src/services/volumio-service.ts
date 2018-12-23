class VolumioHttpService {
    constructor() {
        this.host = '';
    }

    init(host) {
        this.host = host;
    }

    async search(term) {
        const response = await fetch(this.host + '/search?term=' + term)
        const json = await response.json();

        return json.navigation.lists;
    }
}

export default new VolumioHttpService();
