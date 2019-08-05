import React, { Component } from 'react'

export default class EditableText extends Component {
    render() {
        return (
            <div>
                {this.props.text}
                <textarea value="adsad"/>
            </div>
        )
    }
}
