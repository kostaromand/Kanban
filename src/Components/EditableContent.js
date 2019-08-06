import React from 'react'

export default function EditableContent(props) {
    if (!props.inEdit) {
        return (
            <div onClick={() => { props.onEdit() }}>
                {props.content === "" ? "Изменить" : props.content}
            </div>
        )
    }
    else {
        const { EditComponent } = props;
        return (
            <EditComponent
                buttonText={props.buttonText}
                onGetValue={props.onChangeContent}
            />
        )
    }
}
