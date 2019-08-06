import React, { Component } from 'react'

export default class TextAreaButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(event) {
        this.setState({ value: event.target.value });
    }

    handleGetValue() {
        this.props.onGetValue(this.state.value)
    }
    render() {
        return (
            <div>
                <textarea onChange={this.onChangeValue} value={this.state.value} />
                <button onClick={() => this.handleGetValue()}>
                    {this.props.buttonText}
                </button>
            </div>
        )
    }
}