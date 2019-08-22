import React from 'react';
import Modal from './Modal';
import Card from './Card';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import {
    getColumns,
    getUserName,
    getComments,
    getCards,
    getOpenedCardId
} from '../redux/selectors'
import {
    closeCard,
    changeCardThunk as changeCard,
    removeCardThunk as removeCard,
} from '../redux/reducers/cards/actions'
import {
    removeCommentThunk as removeComment,
    addCommentThunk as addComment,
    changeCommentThunk as changeComment,
} from '../redux/reducers/comments/actions'

function CardContainer(props) {
    const { cards, columns, userName, comments, cardId } = props;
    const { closeCard, changeCard, removeCard, removeComment, addComment, changeComment } = props;
    const card = cards.find(card => card.id === cardId);
    const columnTitle = columns.filter(col => col.id === card.columnId)[0].title;
    const commentsOnCard = comments.filter(comment => {
        return comment.cardId === cardId;
    });
    return (
        <Modal onClose={closeCard}>
            <Card
                userName={userName}
                card={card}
                columnTitle={columnTitle}
                comments={commentsOnCard}
                onChangeCard={changeCard}
                onRemoveCard={removeCard}
                onRemoveComment={removeComment}
                onAddComment={addComment}
                onChangeComment={changeComment}
            />
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        cards: getCards(state),
        columns: getColumns(state),
        comments: getComments(state),
        cardId: getOpenedCardId(state),
        userName: getUserName(state)
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        closeCard,
        changeCard,
        removeCard,
        removeComment,
        changeComment,
        addComment
    },
        dispatch
    );


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardContainer);
