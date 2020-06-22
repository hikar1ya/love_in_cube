import React from 'react';
import './List.css'
import { Container } from '@material-ui/core';



export default class Basket extends React.Component {

    render() {
        return (
            <Container>
                <div>
                    <img src="./img/photo1.jpg" weight="100%" height="30%"></img>
                </div>
                <div font="">
                    <p>Что нужно ценить прежде всего?</p>
                    <p>Любовь.</p>
                    <p>Мы ценим вашу любовь к близким людям. Поэтому с заботой приготовили для вас маленькие выражения этого прекрасного чувства.</p>
                    <p>Будем знакомы!</p>
                    <p>Мы - мастерская подарка Love In Cube, или Love³ по-научному. Ведь правильно выразить любовь - тоже наука.</p>
                </div>
            </Container>
        );
    }
}
