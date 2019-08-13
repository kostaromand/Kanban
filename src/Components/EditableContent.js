import React from 'react'

export default function EditableContent(props) {
    if (!props.inEdit) {
        return (
            <div className={"editable-content " + props.contentStyle} onClick={props.onEdit}>
                {props.content === "" ? "Изменить" : props.content}
            </div>
        )
    }
    else {
        const { EditComponent } = props;
        return (
            <EditComponent
                initialValue={props.content}
                buttonText={props.buttonText}
                onGetValue={props.onChangeContent}
            />
        )
    }
}
