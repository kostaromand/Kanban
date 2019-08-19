import {updateDataThunk as updateData} from './dataActions'

export const setUserNameThunk = (userName) => dispatch => {
    dispatch(setUserName(userName));
    dispatch(updateData())
}

export const setUserName = (userName) => {
    return {
        type: "USERNAME_SET",
        userName
    }
}