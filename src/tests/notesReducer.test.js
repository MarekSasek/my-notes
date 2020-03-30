import {allNotesLoaded} from "../actions/actions";
import notesReducer from "../reducers/notes";


const INITIAL_STATE = {
    allNotes: [],
    note: {},
    isViewing: false,
    isCreating: false,
    isEditing: false
};


describe("Testing notes reducer", function () {
    let state;

    beforeEach(() => {
        state = INITIAL_STATE;
    });

    test("Action ALL_NOTES_LOADED test", () => {
        let NOTES = [
            {id: 1, title: "Some note"}
        ];

        let action = allNotesLoaded(NOTES);
        let newState = notesReducer(state, action);

        expect(newState).not.toBe(state);
        expect(newState.allNotes[0].title).toBe("Some note");
    });
});