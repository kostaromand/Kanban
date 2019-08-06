import React, { Component } from 'react'
import InputButton from './InputButton';

export default class EditableText extends Component {
    render() {
        if (!this.props.inEdit) {
            return (
                <div onClick={() => { this.props.onEditTitle() }}>
                    {this.props.title}
                </div>
            )
        }
        else {
            return (
                <InputButton
                    onGetValue={(title) => {
                        this.props.onChangeTitle(title)
                    }}
                    buttonText="Изменить"
                />
            )
        }
    }   
}
