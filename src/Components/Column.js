import React, { Component } from 'react'
import '../css/common.css'
import CardHeader from './CardHeader';
import EditableTitle from './EditableTitle';

export default class Column extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCardToggle: false
        }
        this.handleChangeColumnTitle = this.handleChangeColumnTitle.bind(this);
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

    handleChangeColumnTitle(title) {
        this.props.onChangeColumnTitle(this.props.column.id, title)
    }

    handleEditTitle() {
        this.props.onEditColumnTitle(this.props.column.id);
    }

    render() {
        return (

            <div className="column">
                <div className="column-title">
                    <EditableTitle
                        inEdit={this.props.inEdit}
                        title={this.props.column.title}
                        onChangeTitle={this.handleChangeColumnTitle}
                        onEditTitle={() => { this.handleEditTitle() }}
                    />
                </div>
                {this.props.cards.map(card =>
                    <CardHeader onClick={this.props.onOpenCard}
                        id={card.id}
                        title={card.title}
                        key={card.id}
                    />
                )}
                <EditableTitle
                    inEdit={this.state.addCardToggle}
                    title="Добавить карточку"
                    onChangeTitle={(title) => { this.handleAddCard(title) }}
                    onEditTitle={() => { this.changeAddCardToggle() }}
                />
            </div>

        )
    }
}
