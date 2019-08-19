import { combineReducers } from "redux";
import { userReducer as userStore } from "./userReducer";
import { cardsReducer as cardStore } from './cardsReducer'
import { columnsReducer as columnStore } from './columnsReducer'
import { commentsReducer as commentStore } from './commentsReducer'

export default combineReducers({
    userStore,
    cardStore,
    columnStore,
    commentStore
})