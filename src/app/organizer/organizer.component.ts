import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from '../services/board.service';
import { Card, Column } from '../models/column.model';
import { Store } from '@ngrx/store';
import { ColumnModel, TodoModel } from '../store/todos.states';
import { todosSelector } from '../store/todos.reducers';
import { FacadeService } from '../services/facade.service';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  @Input() text: any;
  @Output() emitText: EventEmitter<{id: number; text: string }> = new EventEmitter();

board: Column[] = [];
form!: FormGroup;
formColumn!: FormGroup;
addingColumn: boolean = false;

  constructor(
    private fb: FormBuilder,
    public boardService: BoardService,
    private store: Store,
    public facadeService: FacadeService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
    })
    this.formColumn = this.fb.group({
      nameColumn: ['', Validators.required]
    })
    this.loadTodos();
  }


  loadTodos() {
    this.store.select(todosSelector).subscribe((state)=> this.board = state);
  }


  addColumn(text: string) {
      text = this.formColumn.value.nameColumn;
      //this.boardService.addColumn(text);
      this.facadeService.addColumn(text);
      this.formColumn.reset();
  }
  onDeleteColumn(columnId: number) {
    //this.boardService.deleteColumn(columnId);
    this.facadeService.deleteColumn(columnId);
  }
  onAddTask(columnId: number, text: string) {
    text = this.form.value.title;
    //this.boardService.addTask(columnId, text)
    this.facadeService.addTask(columnId, text)
  }
  onDeleteTask(item: any, columnId: any) {
    //this.boardService.deleteTask(columnId, item.id)
    this.facadeService.deleteTask(columnId, item.id)
  }
  onUpdateTodo(item: any, columnId: number) {
    //this.boardService.updateTodo(item.id, columnId, item.text)
    this.facadeService.updateTask(item.id, columnId, item.text)
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}






  /*
    onEdit(item: Card, i:number) {
    this.form.controls['title'].setValue(item.text);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updateTask() {
    this.tasks[this.updateIndex].description = this.form.value.title;
    this.tasks[this.updateIndex].done = false;
    this.form.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  onUpdateTask(columnId: number, text: string) {
    this.boardService.updateTask(this.updateIndex, columnId, text)
    this.form.reset();
    this.updateIndex = undefined;
  }
   */




/*
  todos: TodoModel[] = [];
  board: ColumnModel[] = [];

taskInput = ''
tasks: any[] = [];
updateIndex!: any;
isEditEnabled: boolean = false;



  loadTodos() {
    this.store.select(todosSelector).subscribe((state)=> this.todos = state);
    this.store.select(todosSelector).subscribe((state)=> this.board = state);
  }

    onTaskTextEmit(id: number) {
    this.emitText.emit({id, text: this.taskInput});
    this.taskInput = '';
  }

    onEditTask(event: {card: {id: number, text: string}}, columnId: number, input: string) {
    this.updateIndex = event.card.id;
    const {card: {id, text}} = event
    input = event.card.text
    this.boardService.editTask(event.card.id, columnId, event.card.text)
  }
*/