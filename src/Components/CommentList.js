import React, { Component } from 'react'
import TextAreaButton from './TextAreaButton';
import Comment from './Comment'

export default class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentIdInEdit: -1
        }
    }
    handleEdit = (id) => {
        this.setState({ commentIdInEdit: id })
    }
    handleChange = (id, text) => {
        this.props.onChange(id, text);
        this.setState({ commentIdInEdit: -1 })
    }

    render() {
        return (
            <div className="comment-list">
                {this.props.comments.map((comment, id) => {
                    const inEdit = this.state.commentIdInEdit === comment.id;
                    return (
                        <Comment
                            inEdit={inEdit}
                            userName={this.props.userName}
                            comment={comment}
                            key={comment.id}
                            onChange={this.handleChange}
                            onEdit={this.handleEdit}
                            onRemove={this.props.onRemove}
                        />
                    )
                })}
                <div className="add-comment">
                    Оставить комментарий
                    <TextAreaButton
                        buttonText="Добавить комментарий"
                        onGetValue={this.props.onAdd}
                    />
                </div>
            </div>
        )
    }
}
