import { Action } from '@ngrx/store';
import { NoteState } from './notes/types/index';
import { HttpErrorResponse } from '@angular/common/http';

export enum NotesActionTypes {
    GetNotes = '[Notes] Get Notes',
    GetNotesSuccess = '[Notes] Get Notes Success',
    GetNotesFail = '[Notes] Get Notes Fail',
    UpdateNotes = '[Notes] Post Notes',
    UpdateNotesSuccess = '[Notes] Post Notes Success',
    UpdateNotesFail = '[Notes] Post Notes Fail',
}


export class GetNotes implements Action {
    public readonly type = NotesActionTypes.GetNotes;
}

export class GetNotesSuccess implements Action {
    public readonly type = NotesActionTypes.GetNotesSuccess;

    constructor(public payload: NoteState[]) { }
}

export class GetNotesFail implements Action {
    public readonly type = NotesActionTypes.GetNotesFail;

    constructor(public error: HttpErrorResponse) { }
}

export class UpdateNotes implements Action {
    public readonly type = NotesActionTypes.UpdateNotes;

    constructor(public payload: NoteState[]) { }
}

export class UpdateNotesSuccess implements Action {
    public readonly type = NotesActionTypes.UpdateNotesSuccess;

    constructor(public payload: boolean) { }
}

export class UpdateNotesFail implements Action {
    public readonly type = NotesActionTypes.UpdateNotesFail;

    constructor(public error: HttpErrorResponse) { }
}

export type NotesActions = GetNotes | GetNotesSuccess | GetNotesFail | UpdateNotes | UpdateNotesSuccess | UpdateNotesFail;