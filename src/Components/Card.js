import React, { Component } from 'react'

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-title">
                    {this.props.card.title}
                </div>
            </div>
        )
    }
}
