import React from 'react'
import '../css/common.css'
import cross from '../cross.png'
export default function Modal({ onClose, children }) {
    return (
        <div className="overlay flex-center">
            <div className="modal-window">
                {onClose &&
                    <img className="cross-close"
                        src={cross}
                        alt="закрыть"
                        onClick={onClose}
                    />
                }
                {children}
            </div>
        </div>
    )
}

