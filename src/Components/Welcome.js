import React from 'react'
import '../css/common.css'
import InputButton from './InputButton';

export default function Welcome({getUserName}) {
        return (
            <div className="welcome-container flex-center">
                <InputButton getValue = {getUserName} buttonText="Продолжить"/>
            </div>
        )
    }
