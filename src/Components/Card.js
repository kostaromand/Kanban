import React, { Component } from 'react'
import EditableText from './EditableText';

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-title">
                    {this.props.card.title}
                </div>
                <EditableText/>
            </div>
        )
    }
}
