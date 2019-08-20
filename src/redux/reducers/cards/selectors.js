export const getCards = (state) => {
    return state.cardStore.cards;
}

export const getOpenedCardId = (state) => {
    return state.cardStore.openedCardId;
}