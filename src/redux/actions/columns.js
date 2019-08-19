import { updateDataThunk as updateData } from './dataActions'

export const changeColumnTitleThunk = (title, id) => dispatch => {
    dispatch(changeColumnTitle(title, id));
    dispatch(updateData());
}

export const setColumns = (columns) => {
    return {
        type: "COLUMNS_SET",
        payload: columns,
    }
}

export const setDefaultColumns = () => {
    return { type: "COLUMNS_SET_DEFAULT" };
}


export const editColumnTitle = (id) => {
    return {
        type: "COLUMN_TITLE_EDIT",
        id
    }
}

export const changeColumnTitle = (id,title) => {
    return {
        type: "COLUMN_TITLE_CHANGE",
        id,
        title
    }
}