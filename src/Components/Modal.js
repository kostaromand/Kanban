import React, { Component } from 'react'
import '../css/common.css'
import cross from '../cross.png'
export default class Modal extends Component {
    handleClose = (event) => {
        this.props.onClose();
    }
    render() {
        return (
            <div className="overlay flex-center">
                <div className="modal-window">
                    {this.props.onClose &&
                        <img className="cross-close"
                            src={cross}
                            alt="закрыть"
                            onClick={this.handleClose}
                        />
                    }
                    {this.props.children}
                </div>
            </div>
        )
    }
}
