import { combineReducers } from 'redux';
import noteReducer from './note/noteReducer';
import usersReducer from './users/usersReducer';

const rootReducer = combineReducers({
    note: noteReducer,
    users: usersReducer
})

export default rootReducer;