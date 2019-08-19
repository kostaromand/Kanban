import React from 'react'
import { connect } from "react-redux"
import Column from './Column';
import { openCard, addCardThunk as addCard } from '../redux/actions/cardsActions'
import {
    changeColumnTitleThunk as changeColumnTitle,
    editColumnTitle
} from '../redux/actions/columnsActions'

function ColumnsContainer(props) {
    const { cards, columns, comments, columnTitleIdEdit } = props;
    const { changeColumnTitle, editColumnTitle, openCard, addCard } = props;
    return (
        <div className="container-fluid">
            <div className="row column-container">
                {
                    columns.map(column => {
                        const cardsToColumn = cards.filter(card => {
                            return card.columnId === column.id
                        });
                        const inEdit = columnTitleIdEdit === column.id
                        return <Column
                            key={column.id}
                            onAddNewCard={addCard}
                            onOpenCard={openCard}
                            onChangeColumnTitle={changeColumnTitle}
                            onEditColumnTitle={editColumnTitle}
                            column={column}
                            inEdit={inEdit}
                            comments={comments}
                            cards={cardsToColumn}
                        />
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardStore.cards,
        columns: state.columnStore.columns,
        comments: state.commentStore.comments,
        columnTitleIdEdit: state.columnStore.columnTitleIdEdit
    }
}

export default connect(
    mapStateToProps,
    { changeColumnTitle, editColumnTitle, openCard, addCard }
)(ColumnsContainer)
