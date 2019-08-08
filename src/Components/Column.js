import React, { Component } from 'react'
import '../css/common.css'
import CardHeader from './CardHeader';
import EditableContent from './EditableContent';
import InputButton from './InputButton';
import TextAreaButton from './TextAreaButton';

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
        this.props.onAddNewCard(title, this.props.column.id);
    }

    handleChangeColumnTitle(title) {
        this.props.onChangeColumnTitle(this.props.column.id, title)
    }

    handleEditTitle() {
        this.props.onEditColumnTitle(this.props.column.id);
    }

    render() {
        return (
            <div className="col-sm flex-center">
                <div className="column">
                    <div className="column-title">
                        <EditableContent
                            inEdit={this.props.inEdit}
                            content={this.props.column.title}
                            onChangeContent={this.handleChangeColumnTitle}
                            onEdit={() => { this.handleEditTitle() }}
                            buttonText="Изменить"
                            EditComponent={TextAreaButton}
                        />
                    </div>
                    {this.props.cards.map(card => {
                        const commentsCount = this.props.comments.filter(comment =>
                            comment.cardId === card.id
                        ).length;
                        return (
                            <CardHeader onClick={this.props.onOpenCard}
                                id={card.id}
                                title={card.title}
                                key={card.id}
                                commentsCount={commentsCount}
                            />)
                    })}
                    <div>
                        <EditableContent
                            inEdit={this.state.addCardToggle}
                            content="Добавить карточку"
                            onChangeContent={(title) => { this.handleAddCard(title) }}
                            onEdit={() => { this.changeAddCardToggle() }}
                            buttonText="Добавить"
                            contentStyle = "add-card-button"
                            EditComponent={TextAreaButton}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
