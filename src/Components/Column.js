import React, { Component } from 'react'
import '../css/common.css'
import CardHeader from './CardHeader';
import EditableContent from './EditableContent';
import TextAreaButton from './TextAreaButton';

export default class Column extends Component {
    state = {
        addCardToggle: false
    }

    addCardToggle = () => {
        this.setState((prevState) => {
            return { addCardToggle: !prevState.addCardToggle }
        });
    }

    handleAddCard = (title) => {
        this.setState(() => {
            return { addCardToggle: false }
        });
        this.props.onAddNewCard(title, this.props.column.id);
    }

    handleChangeColumnTitle = (title) => {
        this.props.onChangeColumnTitle(this.props.column.id, title)
    }

    handleEditTitle = () => {
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
                            onEdit={this.handleEditTitle}
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
                    {this.state.addCardToggle ?
                        <TextAreaButton
                            initialValue=""
                            buttonText="Добавить"
                            onGetValue={this.handleAddCard}
                        />
                        :
                        <div className="flex-center">
                            <button onClick={this.addCardToggle} className="btn add-card-button">
                                Добавить карточку
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
