import {USERNAME_SET} from './types';
import {updateDataThunk as updateData} from '../data/actions'

export const setUserNameThunk = (userName) => dispatch => {
    dispatch(setUserName(userName));
    dispatch(updateData())
}

export const setUserName = (userName) => {
    return {
        type: USERNAME_SET,
        userName
    }
}