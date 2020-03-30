import {ALL_NOTES_LOADED, NEW_NOTE_LOADED, NOTE_REMOVED, NOTE_VIEWED, NOTE_EDITED, IS_VIEWING, IS_CREATING, IS_EDITING, CURRENT_NOTE} from "../constants/consts";
import { push } from "connected-react-router";


export const allNotesLoaded = (notes) => (
    {type: ALL_NOTES_LOADED, notes}
)

export const newNoteLoaded = (note) => (
    {type: NEW_NOTE_LOADED, note}
)

export const noteRemoved = (id) => (
    {type: NOTE_REMOVED, id}
)

export const noteViewed = (note) => (
    {type: NOTE_VIEWED, note}
)

export const noteEdited = (note) => (
    {type: NOTE_EDITED, note}
)

export const isViewing = () => (
    {type: IS_VIEWING}
)

export const isCreating = () => (
    {type: IS_CREATING}
)

export const isEditing = () => (
    {type: IS_EDITING}
)

export const currentNote = (note) => (
    {type: CURRENT_NOTE, note}
)


export function loadAllNotes() {
    return (dispatch) => {   
        fetch('http://private-9aad-note10.apiary-mock.com/notes')
        .then(response => response.json())
        .then(notes => dispatch(allNotesLoaded(notes)))
        .catch(err => {
            console.log(err);
            alert("Poznámky se nepodařilo nahrát");           
        });
    };      
}


export function createNote(text) {
    return (dispatch) => {
        fetch('http://private-9aad-note10.apiary-mock.com/notes', {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(text)
        })
        .then(response => response.json())
        .then(note => dispatch(newNoteLoaded(note)))
        .then(dispatch(push("/")))
        .catch(err => {
            console.log(err);
            alert("Poznámku se nepodařilo vytvořit");           
        });       
    };
}


export function removeNote(id) {
    return (dispatch) => {
        fetch('http://private-9aad-note10.apiary-mock.com/notes/' + id, {
            method: "DELETE"
        })
        .then(dispatch(noteRemoved(id)))
        .catch(err => {
            console.log(err);
            alert("Poznámku se nepodařilo smazat");           
        });
    };
}


export function viewNote(id) {
    return (dispatch) => {
        dispatch(isViewing());
        fetch('http://private-9aad-note10.apiary-mock.com/notes/' + id)
        .then(response => response.json())
        .then(note => dispatch(noteViewed(note)))
        .then(dispatch(push("/detail")))
        .catch(err => {
            console.log(err);
            alert("Poznámku se nepodařilo zobrazit");
        });
    }
}


export function editNote(id, text) {
    return (dispatch) => {
        fetch('http://private-9aad-note10.apiary-mock.com/notes/' + id, {
            method: "PUT",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(text)
        })
        .then(response => response.json())
        .then(note => dispatch(noteEdited(note)))
        .then(dispatch(push("/")))
        .catch(err => {
            console.log(err);
            alert("Poznámku se nepodařilo editovat");
        });
    }
}