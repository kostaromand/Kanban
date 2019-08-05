import React, { Component } from 'react'
import '../css/common.css'

export default class Modal extends Component {
    render() {
        return (
            <div className="overlay flex-center">
                <div className="modal">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
