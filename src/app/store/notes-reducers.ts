import { NoteState } from './notes/types/index';
import { NotesActionTypes, NotesActions } from './notes-actions';


export interface NoteStateR {
    data: NoteState[];
    isLoading: boolean;
    message: string;
}

const initialState: NoteStateR = {
    data: [],
    isLoading: false,
    message: ''
};

export function reducer(state = initialState, action: NotesActions): NoteStateR {

    switch (action.type) {
        case NotesActionTypes.GetNotes: {
            return {
                ...state,
                isLoading: true
            }
        }

        case NotesActionTypes.GetNotesSuccess: {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                message: 'Data fetch Successfully!'
            }
        }
        case NotesActionTypes.GetNotesFail: {
            return {
                data: [],
                isLoading: false,
                message: 'Something went wrong!'
            }
        }
        case NotesActionTypes.UpdateNotes: {
            return {
                ...state,
                isLoading: true
            }
        }

        case NotesActionTypes.UpdateNotesSuccess: {
            const updatedData = [...state['data']];
            return {
                ...state,
                data: updatedData,
                isLoading: false,
                message: 'Data posted Successfully!'
            }
        }
        case NotesActionTypes.UpdateNotesFail: {
            return {
                data: [],
                isLoading: false,
                message: 'Something went wrong!'
            }
        }
        default:
            return state;
    }
}