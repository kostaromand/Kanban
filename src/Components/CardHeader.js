import React, { Component } from 'react'

export default class CardHeader extends Component {

    changeTitle(title) {
        this.props.changeCardTitle(this.props.id,title);
    }
    render() {
        return (
            <div className="card-header" onClick={() => { this.props.onClick(this.props.id) }}>
                {this.props.title}
            </div>
            
        )
    }
}
