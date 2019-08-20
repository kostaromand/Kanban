import {
    COMMENT_ADD,
    COMMENT_REMOVE,
    COMMENT_CHANGE,
    COMMENTS_SET,
} from './types'
import { CARD_REMOVE } from '../cards/types'

const initialState = {
    comments: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_ADD:
            {
                const { cardId, text, userName } = action;
                if (text.trim() === "") {
                    return state;
                }
                const comment = {
                    id: state.comments.length + 1,
                    cardId,
                    text,
                    autor: userName
                }
                const comments = [...state.comments, comment];
                return { comments }
            }
        case COMMENT_REMOVE: {
            const { id } = action;
            const comments = state.comments.filter((comment) => comment.id !== id);
            return { comments }
        }
        case COMMENT_CHANGE:
            {
                const { id, text } = action;
                if (text.trim() === "") {
                    return state;
                }
                const comment = state.comments.filter(comment => comment.id === id)[0];
                const changedComment = { ...comment, text }
                const comments = state.comments.map((comment) => {
                    if (id === comment.id)
                        return changedComment;
                    else
                        return comment;
                });
                return { comments }
            }

        case COMMENTS_SET:
            return {
                ...state,
                comments: action.payload
            }
        case CARD_REMOVE:
            const { id } = action
            const comments = state.comments.filter(comment => comment.cardId !== id);
            return { comments }
        default:
            return state;
    }
}

