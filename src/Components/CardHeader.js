import React, { Component } from 'react'
import comment from "../com.png";
export default class CardHeader extends Component {

    changeTitle(title) {
        this.props.changeCardTitle(this.props.id, title);
    }
    render() {
        return (
            <div className="card-header" onClick={() => { this.props.onClick(this.props.id) }}>
                {this.props.title}
                <div className="comments-count">
                    <img className="comment-img" src={comment} alt="comments count" />
                    <span>
                        {this.props.commentsCount}
                    </span>
                </div>
            </div>

        )
    }
}
