class Maschine {
    _apiBase = 'https://pokeapi.co/api/v2';

    getResource = async (url) => {
        const res = await fetch(url);
        return res.json();
    };
    getAllDataLink = async (url) => this.getResource(url);
    getAllData = () => this.getResource(`${this._apiBase}/pokemon`);

    async getPokemonList(limit = 10, offset = 0) {
        return this.getResource(`${this._apiBase}/pokemon?limit=${limit}&offset=${offset}`)
    }
}

export default Maschine;
