import { updateDataThunk as updateData } from './dataActions'

export const addCardThunk = (title, columnId) => dispatch => {
    dispatch(addCard(title, columnId));
    dispatch(updateData());
}

export const addCard = (title, columnId) => {
    return {
        type: "CARD_ADD",
        title,
        columnId
    }
}

export const closeCard = () => {
    return {
        type: "CARD_CLOSE"
    }
}

export const removeCardThunk = (id) => dispatch => {
    dispatch(removeCard(id));
    dispatch(updateData());
}


export const removeCard = (id) => {
    return {
        type: "CARD_REMOVE",
        id
    }
}

export const changeCardThunk = (card) => dispatch => {
    dispatch(changeCard(card));
    dispatch(updateData());
}

export const changeCard = (card) => {
    return {
        type: "CARD_CHANGE",
        card
    }
}


export const setCards = (cards) => {
    return {
        type: "CARDS_SET",
        payload: cards
    }
}

export const openCard = (cardId) => {
    return {
        type: "CARD_OPEN",
        payload: cardId
    }
}