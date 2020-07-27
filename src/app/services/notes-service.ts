import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { NoteState } from '../store/notes/types/note-state.type';

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    test:NoteState[] = [];
    x :NoteState= {
        title:'text',
        body:'asd',
        timeStamp:'asdfa'
    }
    

    constructor(private http: HttpClient) { }

    public getNotes(): Observable<NoteState[]> {
        // localStorage.getItem('NotesData');
        // this.test.push(JSON.parse(localStorage.getItem('NotesData')));
        return of(JSON.parse(localStorage.getItem('NotesData')));
    }

    public postNotes(notesData): Observable<boolean> {
        localStorage.setItem('NotesData',JSON.stringify(notesData));
        console.log(notesData);
        return of(true);
    }
}