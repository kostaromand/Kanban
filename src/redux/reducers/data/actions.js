import { setCards } from '../cards/actions';
import { setColumns, setDefaultColumns } from '../columns/actions';
import { setUserName } from '../user/actions';
import { setComments } from '../comments/actions';
import {
    getUserName,
    getColumns,
    getCards,
    getComments
} from '../../selectors'
import {
    DATA_GET,
    STORAGE_UPDATE
} from './types'

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
    return { type: DATA_GET };
}

export const updateStorage = () => {
    return { type: STORAGE_UPDATE };
}

export const updateDataThunk = () => (dispatch, getState) => {
    const state = getState();
    const data = {
        userName: getUserName(state),
        comments: getComments(state),
        cards: getCards(state),
        columns: getColumns(state)
    }
    dispatch(updateStorage());
    const dataToJson = JSON.stringify(data);
    localStorage.setItem("data", dataToJson);
}