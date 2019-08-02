import React, { Component } from 'react'
import '../css/common.css'

export default class Modal extends Component {
    render() {
        return (
            <div className="modal flex-center">
                {this.props.children}
            </div>
        )
    }
}
