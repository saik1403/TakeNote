import { DELETE_NOTE, STORE_NOTES,ADD_NOTE } from "./noteTypes";
import initialState from "../initialState";
import noteActions from "..";
// const initialState = {
//     id: '',
//     notes: {}

// }

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_NOTE:
            return {
                ...state,
                id: action.payload,
                user: action.user,
                notes: state.notes.filter((item) => item.id !== action.payload)
            }
        case STORE_NOTES:
            return {
                ...state,
                notes: action.payload
            }
        case ADD_NOTE:
            const newNotes=state.notes.push(action.payload);
            console.log(newNotes);
            return {
                ...state,
                //notes: state.notes.push(action.payload)
            }
        default: return state
    }
}
export default noteReducer;