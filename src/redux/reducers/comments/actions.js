import {
    COMMENT_ADD,
    COMMENT_REMOVE,
    COMMENT_CHANGE,
    COMMENTS_SET,
} from './types'
import { updateDataThunk as updateData } from '../data/actions'

export const addCommentThunk = (cardId, text) => dispatch => {
    dispatch(addComment(cardId, text));
    dispatch(updateData());
}

export const addComment = (cardId, text) => {
    return {
        type: COMMENT_ADD,
        text,
        cardId
    }
}

export const changeCommentThunk = (id, text) => dispatch => {
    dispatch(changeComment(id, text));
    dispatch(updateData());
}

export const changeComment = (id, text) => {
    return {
        type: COMMENT_CHANGE,
        text,
        id
    }
}

export const removeCommentThunk = (id) => dispatch => {
    dispatch(removeComment(id));
    dispatch(updateData());
}

export const removeComment = (id) => {
    return {
        type: COMMENT_REMOVE,
        id
    }
}

export const setComments = (comments) => {
    return {
        type: COMMENTS_SET,
        payload: comments
    }
}