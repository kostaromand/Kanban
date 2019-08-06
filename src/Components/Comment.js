import React from 'react'
import EditableContent from './EditableContent';
import TextAreaButton from './TextAreaButton';

export default function Comment(props) {
    return (
        <div>
            {props.userName}
            <EditableContent
                content={props.comment.text}
                buttonText="Изменить"
                inEdit={props.inEdit}
                onEdit={()=> {props.onEdit(props.comment.id)}}
                onChangeContent={(text)=>{props.onChange(props.comment.id,text)}}
                EditComponent={TextAreaButton}
            />
            <div onClick = {()=>{props.onRemove(props.comment.id)}}>
                Удалить комментарий
            </div>
        </div>
    )
}
