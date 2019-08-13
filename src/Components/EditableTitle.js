import React, { Component } from 'react'
import InputButton from './InputButton';

export default function EditableTitle({inEdit, onEditTitle,title,onChangeTitle}) {
    if (!inEdit) {
        return (
            <div onClick={onEditTitle}>
                {title}
            </div>
        )
    }
    else {
        return (
            <InputButton
                onGetValue={onChangeTitle}
                buttonText="Изменить"
            />
        )
    }
}