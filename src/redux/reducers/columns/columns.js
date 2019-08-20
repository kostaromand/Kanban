import {
    COLUMNS_SET,
    COLUMNS_SET_DEFAULT,
    COLUMN_TITLE_EDIT,
    COLUMN_TITLE_CHANGE
} from './types'

const initialState = {
    columns: [],
    columnTitleIdEdit: -1
}

export default (state = initialState, action) => {
    switch (action.type) {
        case COLUMNS_SET:
            return {
                ...state,
                columns: action.payload
            }
        case COLUMNS_SET_DEFAULT:
            return {
                ...state,
                columns: [
                    { title: "TODO", id: 0 },
                    { title: "In Progress", id: 1 },
                    { title: "Testing", id: 2 },
                    { title: "Done", id: 3 }
                ]
            };
        case COLUMN_TITLE_EDIT:
            return {
                ...state,
                columnTitleIdEdit: action.id
            }
        case COLUMN_TITLE_CHANGE:
            const { id, title } = action;
            if (title.trim() === "") {
                return {
                    ...state,
                    columnTitleIdEdit: -1
                }
            }
            const oldColumn = state.columns.find(column => column.id === id);
            const newColumn = { ...oldColumn, title };
            const columns = state.columns.map((column) => {
                if (newColumn.id === column.id)
                    return newColumn;
                else
                    return column;
            });
            return {
                columnTitleIdEdit: -1,
                columns
            }

        default:
            return state;
    }
}

