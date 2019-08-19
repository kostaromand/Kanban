import { setCards } from './cardsActions';
import { setColumns,setDefaultColumns } from './columnsActions';
import { setUserName } from './userActions';
import { setComments } from './commentsActions';

export const getDataThunk = () => dispatch => {
    dispatch(getData())
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
        dispatch(setCards(data.cards))
        dispatch(setColumns(data.columns));
        dispatch(setUserName(data.userName));
        dispatch(setComments(data.comments));
    }
    else {
        dispatch(setDefaultColumns());
    }
}

export const getData = () => {
    return { type: "DATA_GET" };
}

export const updateStorage = () => {
    return { type: "STORAGE_UPDATE" };
}


export const updateDataThunk = () => (dispatch, getState) => {
    const { userStore, commentStore, cardStore, columnStore } = getState();
    const data = {
        userName: userStore.userName,
        comments: commentStore.comments,
        cards: cardStore.cards,
        columns: columnStore.columns
    }
    dispatch(updateStorage());
    const dataToJson = JSON.stringify(data);
    localStorage.setItem("data", dataToJson);
}