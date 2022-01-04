import {ADD_NOTE, DELETE_NOTE, STORE_NOTES} from './noteTypes';

const deleteNote = (id='175') =>{
    return {
        type: DELETE_NOTE,
        payload : id,
        user : 'saikiran'
    }
}
const storeNotes = (notes) =>{
    return {
        type : STORE_NOTES,
        payload : notes
    }
}
const addNotes = (note) =>{
    return {
        type : ADD_NOTE,
        payload: note
    }
}
export { deleteNote,storeNotes,addNotes };