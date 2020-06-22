import React from 'react';
import './List.css'

const DivComponent = {
    height: '125px',
    backgroundColor: '#F4C1A2',
    verticalAlign: 'center'
  }

export default class Basket extends React.Component {

    render() {
        return (
            <div>
                <img src="./img/howToOrder.pdf" weight="600px"></img>
            </div>
        );
    }
}
