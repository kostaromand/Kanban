import React, { Component } from 'react'
import '../css/common.css'
import Card from './Card';
import InputButton from './InputButton';

export default class Column extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCardToggle: false
        }
    }

    changeAddCardToggle() {
        this.setState((prevState) => {
            return { addCardToggle: !prevState.addCardToggle }
        });
    }

    onAddCard(name) {
        const card = {
            name,
            columnId:this.props.columnInfo.id
        }
        this.props.addnewCard(card);
        this.setState((prevState) => {
            return { addCardToggle: false }
        });
    }

    render() {
        return (
            <div className="column">
               <div>{this.props.columnInfo.name}</div> 
                {this.props.cards.map(card =>
                    <Card cardInfo={card} key = {card.id} />
                )}
                {this.state.addCardToggle === false
                    ?
                    <button onClick={() => { this.changeAddCardToggle() }}>Добавить карточку</button>
                    :
                    <InputButton
                        getValue={(title) => { this.onAddCard(title) }}
                        buttonText="Добавить"
                    />
                }
            </div>
        )
    }
}
