export const getCards = (state) => {
    return state.cardStore.cards;
}

export const getOpenedCardId = (state) => {
    return state.cardStore.openedCardId;
}

export const getComments = (state) => {
    return state.commentStore.comments;
}

export const getColumns = (state) => {
    return state.columnStore.columns;
}

export const getColumnTitleIdEdit = (state) => {
    return state.columnStore.ColumnTitleIdEdit;
}

export const getUserName = (state) => {
    return state.userStore.userName;
}
