import React from 'react'
import '../css/common.css'
import InputButton from './InputButton';

export default function Welcome({ onGetUserName }) {
    return (
        <div className="welcome-container">
            Введите Ваше имя:
            <div className="name-input">
                <InputButton onGetValue={onGetUserName} buttonText="Продолжить" />
            </div>
        </div>
    )
}
