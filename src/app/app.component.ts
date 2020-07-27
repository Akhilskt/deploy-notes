import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { faArrowLeft, faTrash, faPlusSquare, faBars, faSave } from '@fortawesome/free-solid-svg-icons';
import { Observable, fromEvent, pipe } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { NoteState } from './store/notes/types';
import { Store, select } from '@ngrx/store';
import * as fromNotes from "./store";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  notesForm: FormGroup;
  title = 'notes';
  notes: NoteState[] = [];
  filterednotes: any[] = [];
  selectedIndex;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faPlusSquare = faPlusSquare;
  faSave = faSave;
  faHamburger = faBars;
  toggleSideBar: boolean = false;;
  noteTitleInput: any;
  noteBodyInput: any;
  public isLoading: boolean;
  @ViewChild('noteTitle', { read: ElementRef }) noteTitle: ElementRef;
  private subscriptions: Subscription = new Subscription();
  public input$: Observable<void>;
  constructor(
    private fb: FormBuilder,
    private _store: Store<fromNotes.NoteStateR>
  ) {
    this.buildForm();
    this.noteTitleInput = this.notesForm.get('title');
    this.noteBodyInput = this.notesForm.get('body');
    this.subscriptions.add(
      this.noteTitleInput.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()).subscribe(v => {
          this.notes[this.selectedIndex].title = v;
          this.notes[this.selectedIndex].timeStamp = this.dateInreqFormat();
        }),
    );
    this.subscriptions.add(
      this.noteBodyInput.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()).subscribe(v => {
          this.notes[this.selectedIndex].body = v;
          this.notes[this.selectedIndex].timeStamp = this.dateInreqFormat();
        }),
    );
  }

  ngOnInit() {
    this.addNewNote();
    this.filterednotes = this.notes;
  }

  buildForm() {
    this.notesForm = this.fb.group(
      {
        title: new FormControl('', [Validators.required]),
        body: new FormControl('')
      },
    );
  }

  selectNote(index) {
    this.selectedIndex = index;
    this.notesForm.get('title').setValue(this.notes[index].title)
    this.notesForm.get('body').setValue(this.notes[index].body)
  }

  addNewNote() {
    this.notes.unshift({
      title: "New title",
      body: "Please enter body here....",
      timeStamp: this.dateInreqFormat()
    });
    this.selectNote(0);
  }

  deleteSelectedNote() {
    if(this.notes.length == 1){
      this.notes.splice(this.selectedIndex, 1);
      this.addNewNote()
    } else{
      this.notes.splice(this.selectedIndex, 1);
      this.selectNote(this.selectedIndex);
    }
  }


  dateInreqFormat() {
    var date = new Date();
    var hours = date.getHours();
    var minutes: any = date.getMinutes();
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + newformat;

  }

  search(query: string) {
    query = query.toLowerCase().trim();
    let allResults = [];
    let words = query.split(' ');
    words = this.removeDuplicatesFromWords(words);
    words.forEach(item => {
      let results = this.filteredNotes(item);
      allResults = [...allResults, ...results]
    });
    let uniqueResults = this.removeDuplicatesFromWords(allResults);
    this.filterednotes = uniqueResults;
  }

  removeDuplicatesFromWords(arr) {
    let uniqueWords: Set<any> = new Set<any>();
    arr.forEach(element => {
      uniqueWords.add(element);
    });
    return Array.from(uniqueWords);
  }

  filteredNotes(query: any) {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
    return relevantNotes;
  }

  clickEvent() {
    this.toggleSideBar = !this.toggleSideBar;
  }

  saveToLocalStorage(){
    this._store.dispatch(new fromNotes.UpdateNotes(JSON.parse(JSON.stringify(this.notes))));
    const users$ = this._store.pipe(select(fromNotes.allNotes));
    users$.subscribe(res => {
      this.isLoading = res.isLoading;
    });
  }

}
