import { USERNAME_SET } from './types';

const initialState = {
    userName: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USERNAME_SET:
            return {
                userName: action.userName
            }
        default:
            return state;
    }
}

