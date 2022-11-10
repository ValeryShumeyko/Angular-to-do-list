import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from '../store/todos.actions';

@Injectable({
    providedIn: 'root',
})

export class FacadeService {

    constructor(private store: Store) { }

    addTask(columnId: number, text: string) {
        this.store.dispatch(actions.addTaskAction({columnId: columnId, text: text}))
    }
    deleteTask(columnId: number, itemId: number) {
        this.store.dispatch(actions.deleteTaskAction({columnId: columnId, itemId: itemId}))
    }
    addColumn(text: string) {
        this.store.dispatch(actions.addColumnAction({text: text}))
    }
    deleteColumn(columnId: number) {
        this.store.dispatch(actions.deleteColumnAction({columnId: columnId}))
    }
    updateTask(itemId: number, columnId: number, itemText: string) {
        this.store.dispatch(actions.updateTaskAction({itemId: itemId, columnId: columnId, itemText: itemText}))
    }
}


