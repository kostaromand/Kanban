import React, { Component } from 'react'

export default class InputButton extends Component {
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


    render() {
        return (
            <div>
                <input type="text" onChange={this.onChangeValue} value={this.state.value} />
                <button onClick={() => this.props.getValue(this.state.value)}>
                    {this.props.buttonText}
                </button>
            </div>
        )
    }
}
