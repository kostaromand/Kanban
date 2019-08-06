import React, { Component } from 'react'
import EditableContent from './EditableContent';
import TextAreaButton from './TextAreaButton';
import InputButton from './InputButton';
import CommentList from './CommentList';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleInEdit: false,
            descriptionInEdit: false
        }
    }

    handleEditTitle() {
        this.setState({ titleInEdit: true })
    }
    handleChangeTitle(title) {
        this.setState({ titleInEdit: false })
        const changedCard = { ...this.props.card, title }
        this.props.onChangeCard(changedCard)
    }
    handleEditDescription() {
        this.setState({ descriptionInEdit: true })
    }
    handleChangeDescription(description) {
        this.setState({ descriptionInEdit: false })
        const changedCard = { ...this.props.card, description }
        this.props.onChangeCard(changedCard)
    }

    render() {
        return (
            <div className="card">
                <div className="card-title">
                    <EditableContent
                        inEdit={this.state.titleInEdit}
                        content={this.props.card.title}
                        onEdit={() => { this.handleEditTitle() }}
                        buttonText={"Изменить"}
                        onChangeContent={(title) => { this.handleChangeTitle(title) }}
                        EditComponent={InputButton}
                    />
                </div>
                <div className="card-description">
                    Описание карточки
                    <EditableContent
                        inEdit={this.state.descriptionInEdit}
                        content={this.props.card.description}
                        onEdit={() => { this.handleEditDescription() }}
                        buttonText={"Изменить"}
                        onChangeContent={(description) => this.handleChangeDescription(description)}
                        EditComponent={TextAreaButton}
                    />
                </div>
                <button onClick={() => { this.props.onRemoveCard(this.props.card.id) }}>
                    Удалить карточку
                </button>
                <CommentList
                    userName = {this.props.userName}
                    comments={this.props.comments}
                    onRemove={this.props.onRemoveComment}
                    onChange={this.props.onChangeComment}
                    onAdd={(text)=>{this.props.onAddComment(this.props.card.id,text)}}
                />
            </div>
        )
    }
}
