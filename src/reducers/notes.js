import {ALL_NOTES_LOADED, NEW_NOTE_LOADED, NOTE_REMOVED, NOTE_VIEWED, NOTE_EDITED, IS_VIEWING, IS_CREATING, IS_EDITING, CURRENT_NOTE} from "../constants/consts";


const initialState = {
    allNotes: [],
    note: {},
    isViewing: false,
    isCreating: false,
    isEditing: false
};

const notesReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case ALL_NOTES_LOADED: 
            newState = {...state, allNotes: action.notes};
            return newState;
        case NEW_NOTE_LOADED:
            let newAllNotes = [...state.allNotes];
            newAllNotes.unshift(action.note);
            newState = {...state, allNotes: newAllNotes};
            return newState;
        case NOTE_REMOVED:
            let removedFromAllNotes = [...state.allNotes].filter(note => note["id"] !== action.id);
            newState = {...state, allNotes: removedFromAllNotes};
            return newState;
        case NOTE_VIEWED:
            newState = {...state, note: action.note};           
            return newState;
        case NOTE_EDITED:
            newState = {...state, note: action.note};
            return newState;
        case IS_VIEWING:
            newState = {...state, isViewing: true, isCreating: false, isEditing: false};
            return newState;
        case IS_CREATING:
            newState = {...state, isCreating: true, isViewing: false, isEditing: false};
            return newState;
        case IS_EDITING:
            newState = {...state, isEditing: true, isCreating: false, isViewing: false};
            return newState;
        case CURRENT_NOTE:
            newState = {...state, note: action.note};
            return newState;         
        default:
            return state;
    }       
};


export default notesReducer;