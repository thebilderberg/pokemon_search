import React, { useEffect, useState } from 'react';
import { Tooltip, TreeSelect } from 'antd';
import Maschine from "../services/MaschineOld";

const serviceData = new Maschine();

function PokemonAppOld() {
    const [names, setNames] = useState({ nameOne: 'nameOne', nameTwo: 'nameTwo' });
    const [abilities, setAbilities] = useState({
        abilitiesOne: ['abilitiesBulbasaurOne', 'abilitiesBulbasaurTwo'],
        abilitiesTwo: ['abilitiesCharizardOne', 'abilitiescharizardTwo'],
    });

    const [objectPoke, setObjectPoke] = useState(
        {
            abilities: 'info',
            cries: 'info',
            forms: 'info',
            geme_indices: 'info',
            moves: 'info',
            stats: 'info',
            types: 'info',
            sprites: 'info',
        }
    );

    const getAllDataObjectPoke = async () => {
        const data = await serviceData.getAllDataLink('https://pokeapi.co/api/v2/pokemon/1');
        const filterData = {
            abilities: 'info',
            cries: 'info',
            forms: 'info',
            geme_indices: 'info',
            moves: 'info',
            stats: 'info',
            types: 'info',
            sprites: 'info',
        };
        for (let item in filterData) {
            filterData[item] = data[item];
        }
        console.log(filterData);
        setObjectPoke(filterData);
    }



    const [abilitiesDescriptionBulbasaur, setAbilitiesDescriptionBulbasaur] = useState([]);
    const [abilitiesDescriptionCharizard, setAbilitiesDescriptionCharizard] = useState([]);

    const [movesBulbasaur, setMovesBulbasaur] = useState([]);
    const [movesCharizard, setMovesCharizard] = useState([]);
    const [movesDescriptionBulbasaur, setMovesDescriptionBulbasaur] = useState([]);
    const [movesDescriptionCharizard, setMovesDescriptionCharizard] = useState([]);

    const [sprite, setSprite] = useState('img');
    const [sprite1, setSprite1] = useState('img');

    const [value, setValue] = useState();

    const onChange = (newValue) => setValue(newValue);

    useEffect(() => {
        fetchNames();
        fetchAbilities();
        fetchAbilitieDescriptionBulbasaur();
        fetchAbilitieDescriptionCharizard();
        fetchDescriptionBulbasaur();
        fetchDescriptionCharizard();
        getImgSprite();
        getMovesBulbasaur();
        getMovesCharizard();
        getMovesDescriptionBulbasaur();
        fetchMovesDescriptionBulbasaur();
        fetchMovesDescriptionCharizard();
        getAllDataObjectPoke();
    }, []);

    const fetchNames = async () => {
        const nameOne = await serviceData.getName(0);
        const nameTwo = await serviceData.getName(5);
        setNames({ nameOne, nameTwo });
    };

    const fetchAbilities = async () => {
        const abilitiesOne = await serviceData.returnAbilitiesBulbasaur();
        const abilitiesTwo = await serviceData.returnAbilitiesCharizard();
        setAbilities({ abilitiesOne, abilitiesTwo });
    };

    const getImgSprite = async () => {
        const sprite = await serviceData.returnSpritesBulbasaur();
        const sprite1 = await serviceData.returnSpritesCharizard();
        setSprite(sprite);
        setSprite1(sprite1);
    };

    // Bulbasaur ______________________________________________________________________

    const fetchAbilitieDescriptionBulbasaur = async () => {
        const movesDescriptionList = await serviceData.returnAbilitiesDescriptionBulbasaur();
        const listDescription = await Promise.all(
            movesDescriptionList.map(async (item) => {
                const description = await serviceData.getAllDataLink(item);
                return description.effect_entries[0].effect;
            })
        );
        return listDescription;
    };

    const fetchDescriptionBulbasaur = async () => {
        const listDescription = await fetchAbilitieDescriptionBulbasaur();
        setAbilitiesDescriptionBulbasaur(listDescription);
    };

    const getMovesBulbasaur = async () => {
        const movesList = await serviceData.returnMovesBulbasaur();
        setMovesBulbasaur(movesList);
    }

    const getMovesDescriptionBulbasaur = async () => {
        const movesDescriptionList = await serviceData.returnMovesDescriptionBulbasaur();
        const listDescription = await Promise.all(
            movesDescriptionList.map(async (item) => {
                const description = await serviceData.getAllDataLink(item);
                return description.accuracy;
            })
        );
        return listDescription;
    };

    const fetchMovesDescriptionBulbasaur = async () => {
        const newMove = await getMovesDescriptionBulbasaur();
        setMovesDescriptionBulbasaur(newMove);
    }

    // Charizard ______________________________________________________________________

    const fetchAbilitieDescriptionCharizard = async () => {
        const movesDescriptionList = await serviceData.returnAbilitiesDescriptionCharizard();
        const listDescription = await Promise.all(
            movesDescriptionList.map(async (item) => {
                const description = await serviceData.getAllDataLink(item);
                return description.effect_entries[0].effect;
            })
        );
        return listDescription;
    };

    const fetchDescriptionCharizard = async () => {
        const listDescription = await fetchAbilitieDescriptionCharizard();
        setAbilitiesDescriptionCharizard(listDescription);
    };

    const getMovesCharizard = async () => {
        const movesList = await serviceData.returnMovesCharizard();
        setMovesCharizard(movesList);
    }

    const getMovesDescriptionCharizard = async () => {
        const movesDescriptionList = await serviceData.returnMovesDescriptionCharizard();
        const listDescription = await Promise.all(
            movesDescriptionList.map(async (item) => {
                const description = await serviceData.getAllDataLink(item);
                return description.accuracy;
            })
        );
        return listDescription;
    };

    const fetchMovesDescriptionCharizard = async () => {
        const newMove = await getMovesDescriptionCharizard();
        setMovesDescriptionCharizard(newMove);
    }


    const treeData = [
        {
            value: 'Pokemons',
            title: <Tooltip placement="bottom" title="Подсказка"><div>Pokemons</div></Tooltip>,
            children: [
                {
                    value: objectPoke.forms[0].name,
                    title: objectPoke.forms[0].name,
                    children: [
                        {
                            value: `Изображение1`,
                            title: ` Изображение`,
                            children: [
                                {
                                    value: `img`,
                                    title: <div><img src={objectPoke.sprites.front_default} alt="xxxx"/></div>,
                                },
                            ],
                        },
                        {
                            value: `Способности1`,
                            title: `Способности`,
                            children: abilities.abilitiesOne.map((ability, num) => ({
                                value: ability,
                                title: <Tooltip placement="bottom" title={abilitiesDescriptionBulbasaur[num]}><div>{ability}</div></Tooltip>,
                            }))
                        },
                        {
                            value: `Атаки1`,
                            title: `Атаки`,
                            children: movesBulbasaur.map((move, num) => ({
                                value: move,
                                title: <Tooltip placement="bottom" title={`accuracy: ${movesDescriptionBulbasaur[num]}`}><div>{move}</div></Tooltip>,
                            }))
                        },
                    ],
                },
                // {                          // Bulbasaur
                //     value: names.nameOne,
                //     title: names.nameOne,
                //     children: [
                //         {
                //             value: `Изображение1`,
                //             title: ` Изображение`,
                //             children: [
                //                 {
                //                     value: `img`,
                //                     title: <div><img src={sprite} alt="xxxx"/></div>,
                //                 },
                //             ],
                //         },
                //         {
                //             value: `Способности1`,
                //             title: `Способности`,
                //             children: abilities.abilitiesOne.map((ability, num) => ({
                //                 value: ability,
                //                 title: <Tooltip placement="bottom" title={abilitiesDescriptionBulbasaur[num]}><div>{ability}</div></Tooltip>,
                //             }))
                //         },
                //         {
                //             value: `Атаки1`,
                //             title: `Атаки`,
                //             children: movesBulbasaur.map((move, num) => ({
                //                 value: move,
                //                 title: <Tooltip placement="bottom" title={`accuracy: ${movesDescriptionBulbasaur[num]}`}><div>{move}</div></Tooltip>,
                //             }))
                //         },
                //     ],
                // },
                // {                          // Charizard
                //     value: names.nameTwo,
                //     title: names.nameTwo,
                //     children: [
                //         {
                //             value: `Изображение2`,
                //             title: ` Изображение`,
                //             children: [
                //                 {
                //                     value: `img1`,
                //                     title: <div><img src={sprite1} alt="xxx"/></div>,
                //                 },
                //             ],
                //         },
                //         {
                //             value: `Способности2`,
                //             title: `Способности`,
                //             children: abilities.abilitiesTwo.map((ability, num) => ({
                //                 value: ability,
                //                 title: <Tooltip placement="bottom" title={abilitiesDescriptionCharizard[num]}><div>{ability}</div></Tooltip>,
                //             }))
                //         },
                //         {
                //             value: `Атаки2`,
                //             title: `Атаки`,
                //             children: movesCharizard.map((move, num) => ({
                //                 value: move+1,
                //                 title: <Tooltip placement="bottom" title={`accuracy: ${movesDescriptionCharizard[num]}`}><div>{move}</div></Tooltip>,
                //             }))
                //         },
                //     ],
                // }
            ]
        }
    ];
    return (
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={value}
            dropdownStyle={{ maxHeight: 900, overflow: 'auto' }}
            placeholder="Поиск..."
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
        />
    );
}

export default PokemonAppOld;