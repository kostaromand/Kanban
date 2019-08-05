import React, { Component } from 'react'
import '../css/common.css'
import InputButton from './InputButton';
import CardHeader from './CardHeader';

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

    handleAddCard(title) {
        this.setState(() => {
            return { addCardToggle: false }
        });
        const card = {
            title,
            columnId: this.props.column.id,
            description: ""
        }
        this.props.onAddNewCard(card);
    }

    render() {
        return (

            <div className="column">
                <div className="column-title">
                    {this.props.inEdit ?
                        <InputButton
                            onGetValue={(title) => {
                                this.props.onChangeColumnTitle(this.props.column.id, title)
                            }}
                            buttonText="Изменить"
                        />
                        :
                        <div
                            onClick={() => { this.props.onColumnTitleEdit(this.props.column.id) }}
                        >
                            {this.props.column.title}
                        </div>
                    }
                </div>
                {this.props.cards.map(card =>
                    <CardHeader onClick={this.props.onOpenCard}
                        id={card.id}
                        title={card.title}
                        key={card.id}
                    />
                )}
                {this.state.addCardToggle === false
                    ?
                    <button onClick={() => { this.changeAddCardToggle() }}>Добавить карточку</button>
                    :
                    <InputButton
                        onGetValue={(title) => { this.handleAddCard(title) }}
                        buttonText="Добавить"
                    />
                }
            </div>

        )
    }
}
