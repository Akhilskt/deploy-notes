import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { NotesService } from '../services/notes-service';
import { Action } from '@ngrx/store';
import * as fromNotes from '.'
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NoteState } from './notes/types/index';

@Injectable()
export class NoteEffects {

    constructor(private actions$: Actions,
        private noteService: NotesService) {
    }

    @Effect()
    getNotes$: Observable<Action> = this.actions$.pipe(
        ofType(fromNotes.NotesActionTypes.GetNotes),
        mergeMap(() =>
            this.noteService.getNotes().pipe(
                map((note: NoteState[]) => {
                    console.log('note from APi',note);
                    return new fromNotes.GetNotesSuccess(note);
                }),
                catchError((error) =>
                    of(new fromNotes.GetNotesFail(error)))
            )
        ));

    @Effect()
    postNote$: Observable<Action> = this.actions$.pipe(
        ofType(fromNotes.NotesActionTypes.UpdateNotes),
        map((action: fromNotes.UpdateNotes) => action.payload),
        mergeMap((note: NoteState[]) =>
            this.noteService.postNotes(note).pipe(
                map((note: boolean) => {
                    return new fromNotes.UpdateNotesSuccess(note);
                }),
                catchError((error) =>
                    of(new fromNotes.UpdateNotesFail(error)))
            )
        ));
}