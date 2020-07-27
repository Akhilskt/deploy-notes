import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NoteStateR } from ".";

const getNoteState = createFeatureSelector<NoteStateR>('notes');

export const allNotes = createSelector(getNoteState, (state: NoteStateR) => {
    return state;
});

// export const firstTenNotes = createSelector(getNoteState, (state: NoteStateR) => {
//     const notes = state.data.slice(0, 10);
//     return { ...state, data: notes };
// });