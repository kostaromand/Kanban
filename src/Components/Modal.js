import React, { Component } from 'react'
import '../css/common.css'

export default class Modal extends Component {
    handleClose(event) {
        if (event.target.classList.contains("overlay")) {
            this.props.onClose();
        }
    }
    render() {
        return (
            <div className="overlay flex-center" onClick={(e) => {
                this.handleClose(e);
            }}
            >
                <div className="modal">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
