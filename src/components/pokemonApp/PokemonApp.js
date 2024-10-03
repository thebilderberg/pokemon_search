import React, { useEffect, useState } from 'react';
import { Tooltip, TreeSelect, Avatar, Card} from 'antd';
import Maschine from "../services/Maschine";
import Meta from "antd/es/card/Meta";

function PokemonApp() {
    const pokemonService = new Maschine();
    const [pokemonThree, setPokemonThree] = useState([]);
    const [value, setValue] = useState();

    const getAllDataObjectPoke = async (data) => {
        const filterData = {
            abilities: data.abilities || [],
            moves: data.moves || [],
            stats: data.stats || [],
            sprites: data.sprites || [],
        };
        return filterData;
    }

    const onChange = (newValue) => setValue(newValue);

    useEffect(() => {
        loadPokemonList();
    }, [])

    const loadPokemonList = async () => {
        const pokemonsData = await pokemonService.getPokemonList();

        const mappedThree = [
            {
                value: 'Pokemons',
                title: (
                    <Tooltip placement='bottom' title='Подсказка'>
                        <div>Покемоны</div>
                    </Tooltip>
                ),
                children: await Promise.all(
                    pokemonsData.results.map(async (item, index) => {
                        const onePokemonData = await pokemonService.getAllDataLink(item.url);
                        const filterOnePokemonData = await getAllDataObjectPoke(onePokemonData);
                        console.log(filterOnePokemonData);

                        return {
                            value: item.name,
                            title: <Tooltip placement="bottom" title={<Card
                                style={{ width: 200 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={filterOnePokemonData.sprites.front_default}
                                    />
                                }
                            >
                                <Meta
                                    title={item.name}
                                    description="This is the description"
                                />
                            </Card>}><div>{item.name}</div></Tooltip>,
                            children: [
                                {
                                    value: 'abilities'+index,
                                    title: 'Abilities',
                                    children: filterOnePokemonData.abilities.map((abilityItem) => ({
                                        value: abilityItem.ability.name+index,
                                        title: abilityItem.ability.name,
                                    })),
                                },
                                {
                                    value: 'moves'+index,
                                    title: 'Moves',
                                    children: filterOnePokemonData.moves.slice(0, 5).map((moveItem) => ({
                                        value: moveItem.move.name+index,
                                        title: moveItem.move.name,
                                    })),
                                },
                                {
                                    value: 'stats'+index,
                                    title: 'Stats',
                                    children: filterOnePokemonData.stats.map((statItem) => ({
                                        value: statItem.stat.name+index,
                                        title: `${statItem.stat.name}: ${statItem.base_stat}`,
                                    })),
                                },
                            ],
                        };
                    })
                ),
            },
        ];

        setPokemonThree(mappedThree);
    };

    return (
        <TreeSelect className="tree"
            showSearch
            style={{ width: '100%' }}
            value={value}
            dropdownStyle={{ maxHeight: 900, overflow: 'auto' }}
            placeholder="Поиск..."
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={pokemonThree}
        />
    );
}

export default PokemonApp;
