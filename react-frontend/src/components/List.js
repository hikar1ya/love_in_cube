import React from 'react';

export default class List extends React.Component {
    render() {
        console.log(this.props.items)
        return (
            <div>
                {
                    this.props.items.map((gift) =>
                        <div>{gift.name}</div>)}
            </div>
        );
    }
}

