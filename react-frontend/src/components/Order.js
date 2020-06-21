import React from 'react';
import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './List.css'



export default class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            list_id: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeNumber(event) {
        this.setState({ number: event.target.value });
    }

    render() {
        return (
            <Container style={{display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: '1', alignSelf: 'center', borderColor: 'black'}}>
                    <div>Введите ваше имя:</div>
                    <Input value={this.state.name} onChange={this.handleChangeName}></Input>
                    <div>Номер:</div>
                    <Input value={this.state.number} onChange={this.handleChangeNumber}></Input>
                    <div>
                        <Button onClick={() => {
                            fetch('http://localhost:5000/order', { method: "POST", body: [this.state.name, this.state.number, this.state.list_id] })
                        }}>Отправить</Button>
                    </div>
                </div>
            </Container>
        );
    }
}