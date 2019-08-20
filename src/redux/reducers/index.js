import { combineReducers } from "redux";
import cardStore from './cards'
import userStore from "./user"
import columnStore from './columns'
import commentStore from './comments'

export default combineReducers({
    userStore,
    cardStore,
    columnStore,
    commentStore
})