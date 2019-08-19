const initialState = {
    userName: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAME_SET":
            return {
                userName: action.userName
            }
        default:
            return state;
    }
}

