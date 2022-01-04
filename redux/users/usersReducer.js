import initialState from "../initialState";
import { ADD_USER, LOGIN, LOGOUT, STORE_USER } from "./usersTypes";
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USER:
            return {
                ...state,
                users: action.payload
            }
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: ''
            }
        case ADD_USER:
            state.users.push(action.payload)
            return {
                ...state,
            }
        default: return state
    }
}
export default usersReducer;