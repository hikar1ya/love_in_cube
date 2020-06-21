import React from 'react';
import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './List.css'



export default class Order extends React.Component {

    render() {
        return (
            <Container>
                <div>Номер:</div>
                <Input autoFocus="true"></Input>
                <Button onClick={() => {
                    fetch('http://localhost:5000/add', { method: "POST"})
                }} size="small" color="primary" className="button">
                    Отправить</Button>
            </Container>
        );
    }
}