class Maschine {
    _apiBase = 'https://pokeapi.co/api/v2';
    _apiPokemons = 'https://pokeapi.co/api/v2/pokemon';

    getResource = async (url) => {
        const res = await fetch(url);
        return res.json();
    };
    getAllDataLink = async (url) => this.getResource(url);
    getAllData = () => this.getResource(`${this._apiBase}/pokemon`);
    getStatsBulbasaur = () => this.getResource(`${this._apiPokemons}/bulbasaur`);
    getStatsCharizard = () => this.getResource(`${this._apiPokemons}/charizard`);

    getName = async (id) => {
        const data = await this.getAllData();
        return data.results[id]?.name || 'No name found';
    };

    async getPokemonList(limit = 10, offset = 0) {
        return this.getResource(`${this._apiBase}/pokemon?limit=${limit}&offset=${offset}`)
    }

    // Bulbasaur ______________________________________________________________________

    returnAbilitiesBulbasaur = async () => {
        const { abilities } = await this.getStatsBulbasaur();
        return abilities.map(item => item.ability.name);
    };

    returnAbilitiesDescriptionBulbasaur = async () => {
        const { abilities } = await this.getStatsBulbasaur();
        return abilities.map(item => item.ability.url);
    };

    returnSpritesBulbasaur = async () => {
        const { sprites } = await this.getStatsBulbasaur();
        return sprites.front_default;
    };

    returnMovesBulbasaur = async () => {
        const { moves } = await this.getStatsBulbasaur();
        const listMoves = [];
        moves.forEach((item, num) => {
            listMoves[num] = item.move.name;
        });
        return listMoves;
    }

    returnMovesDescriptionBulbasaur = async () => {
        const { moves } = await this.getStatsBulbasaur();
        const listMovesDescription = [];
        moves.forEach((item, num) => {
            listMovesDescription[num] = item.move.url
        });
        return listMovesDescription;
    }



    // Charizard ______________________________________________________________________

    returnAbilitiesCharizard = async () => {
        const { abilities } = await this.getStatsCharizard();
        return abilities.map(item => item.ability.name);
    };

    returnAbilitiesDescriptionCharizard = async () => {
        const { abilities } = await this.getStatsCharizard();
        return abilities.map(item => item.ability.url);
    };

    returnSpritesCharizard = async () => {
        const { sprites } = await this.getStatsCharizard();
        return sprites.front_default;
    };

    returnMovesCharizard = async () => {
        const { moves } = await this.getStatsCharizard();
        const listMoves = [];
        moves.forEach((item, num) => {
            if(num < 80) {
                listMoves[num] = item.move.name;
            }
        });
        return listMoves;
    }

    returnMovesDescriptionCharizard = async () => {
        const { moves } = await this.getStatsCharizard();
        const listMovesDescription = [];
        moves.forEach((item, num) => {
            if (num < 80) {
                listMovesDescription[num] = item.move.url;
            }
        });
        return listMovesDescription;
    }

}

export default Maschine;
