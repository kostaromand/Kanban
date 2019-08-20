import {
    CARD_ADD,
    CARD_REMOVE,
    CARD_CHANGE,
    CARDS_SET,
    CARD_OPEN,
    CARD_CLOSE
} from './types'

const initialState = {
    cards: [],
    openedCardId: null,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case CARD_ADD:
            {
                const { title, columnId } = action
                if (title.trim() === "")
                    return state;
                const card = {
                    title,
                    columnId,
                    description: "",
                    id: Math.random().toString(36).substr(2, 9)
                }
                const cards = [...state.cards, card];
                return {
                    openedCardId: null,
                    cards
                }
            }
        case CARD_REMOVE: {
            const id = action.id
            const cards = state.cards.filter((card) => card.id !== id);
            return {
                cards
            }
        }
        case CARD_CHANGE:
            {
                const changedCard = action.card;
                if (changedCard.title.trim() === "") {
                    return state;
                }

                const cards = state.cards.map((card) => {
                    if (changedCard.id === card.id)
                        return changedCard;
                    else
                        return card;
                });

                return {
                    ...state,
                    cards
                }
            }

        case CARDS_SET:
            return {
                ...state,
                cards: action.payload
            }
        case CARD_OPEN:
            return {
                ...state,
                openedCardId: action.payload
            }
        case CARD_CLOSE:
            return {
                ...state,
                openedCardId: null
            }
        default:
            return state;
    }
}

