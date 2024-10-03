import React from 'react';
import { Layout } from 'antd';
import './Wrapper.css';
import Title from "antd/lib/typography/Title";
import PokemonApp from "../pokemonApp/PokemonApp";

const { Header, Footer } = Layout;

function Wrapper() {
    return (
    <Layout>
        <Header></Header>
        <Title className="title"> Найди своего покемона</Title>
        <div className="wrapper"><PokemonApp/></div>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Pokemon Search ©{new Date().getFullYear()} Created by Bilderberg
        </Footer>
    </Layout>
    );
}

export default Wrapper;
