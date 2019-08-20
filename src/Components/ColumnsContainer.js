import React from 'react'
import { connect } from "react-redux"
import Column from './Column';
import { openCard, addCardThunk as addCard } from '../redux/reducers/cards/actions'
import { getCards } from '../redux/reducers/cards/selectors'
import { getColumns, getColumnTitleIdEdit } from '../redux/reducers/columns/selectors'
import { getComments } from '../redux/reducers/comments/selectors'
import { bindActionCreators } from 'redux'
import {
    changeColumnTitleThunk as changeColumnTitle,
    editColumnTitle
} from '../redux/reducers/columns/actions'

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
        cards: getCards(state),
        columns: getColumns(state),
        comments: getComments(state),
        columnTitleIdEdit: getColumnTitleIdEdit(state)
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        changeColumnTitle,
        editColumnTitle,
        openCard,
        addCard
    },
        dispatch
    );


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ColumnsContainer)
