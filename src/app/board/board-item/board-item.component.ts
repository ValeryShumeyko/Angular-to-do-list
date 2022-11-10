import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {
  @Input() item: any;

  @Output() emitTask: EventEmitter<Task> = new EventEmitter();
  @Output() emitEdit: EventEmitter<Task> = new EventEmitter();
  //@Output() emitEdit: EventEmitter<{ card: any }> = new EventEmitter();

  editTodo: boolean = false;
  formEdit!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private store: Store, 
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      editInput: ['', [Validators.required]],
    })
  }

  updateToggle() {
    this.editTodo = !this.editTodo;
  }

  onTaskEmit(item: any) {
    this.emitTask.emit(item);
  }
  onEditEmit(item: any) {
    this.emitEdit.emit(item);
    //this.emitEdit.emit({ card })
  }





/*
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/models/column.model';
  import { actions } from 'src/app/store/todos.actions';
import { TodoModel } from 'src/app/store/todos.states';
  @Input() todo?: TodoModel;
  this.form = this.fb.group({
    title: ['', [Validators.required]],
  });
  todoInput?: string;
  form!: FormGroup;
    updateTodo() {
    if (this.todoInput != '' && this.todoInput != undefined) {
      this.editTodo = !this.editTodo;
      this.store.dispatch(actions.updateTaskAction({
          id: this.todo!.id,
          title: this.todoInput!,
          list: []
      }))
    }
  }
    deleteTodo(todoId: any) {
    this.store.dispatch(actions.deleteTodoAction({
        id: this.todo!.id,
        title: this.todo!.title,
        list: []
    }))
  }*/

}
