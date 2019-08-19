import React from 'react';
import Modal from './Modal';
import Card from './Card';
import { connect } from "react-redux"
import {
    closeCard,
    changeCardThunk as changeCard,
    removeCardThunk as removeCard,
} from '../redux/actions/cards'
import {
    removeCommentThunk as removeComment,
    addCommentThunk as addComment,
    changeCommentThunk as changeComment,
} from '../redux/actions/comments'

function CardContainer(props) {
    const { cards, columns, userName, comments, cardId } = props;
    const { closeCard, changeCard, removeCard, removeComment,addComment, changeComment } = props;
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
    const { cardStore, columnStore, commentStore, userStore } = state
    return {
        cards: cardStore.cards,
        columns: columnStore.columns,
        comments: commentStore.comments,
        cardId: cardStore.openedCardId,
        userName: userStore.userName
    }
}

export default connect(
    mapStateToProps,
    { closeCard, changeCard, removeCard, removeComment, changeComment, addComment }
)(CardContainer);
