import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, Column } from '../models/column.model';

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    private initBoard = [
        {
            id: 1,
            title: 'To Do',
            list: [],
            isOpenFormAddTask: false,
            input: '',
        },
        {
            id: 2,
            title: 'In progress',
            list: [],
            isOpenFormAddTask: false,
            input: '',
        },
        {
            id: 3,
            title: 'Done',
            list: [],
            isOpenFormAddTask: false,
            input: '',
        },
    ]
    private board: Column[] = this.initBoard
    private board$ = new BehaviorSubject<Column[]>(this.initBoard)

    getBoard$() {
        return this.board$.asObservable()
    }

    addColumn(title: string) {
        const newColumn: Column = {
            id: Date.now(),
            title: title,
            list: [],
            isOpenFormAddTask: false,
            input: '',
        };
        this.board = [ ...this.board, newColumn];
        this.board$.next([...this.board]);
    }

    deleteColumn(columnId: number) {
        this.board = this.board.filter((column: Column) => column.id !==columnId);
        this.board$.next([...this.board]);
    }

    addTask(columnId:number, text: string) {
        this.board = this.board.map((column: Column) => {
            if (column.id === columnId) {
                const newTask: Card = {
                    id: Date.now(),
                    text,
                }
                column.list = [...column.list, newTask];
            }
            return column;
        })
        this.board$.next([...this.board]);
    }

    deleteTask(columnId: number, itemId: number) {
        this.board = this.board.map((column) => {
            if (column.id === columnId) {
                column.list = column.list.filter((item: { id: number; }) => {
                    return item.id !== itemId
                })
            }
            return column
        })
        this.board$.next([...this.board])
    }

    updateTodo(itemId: number, columnId: number, cardText: string) {
        this.board = this.board.map((column) => {
            if (column.id === columnId) {
                const list = column.list.map(item => {
                    if(item.id === itemId) {
                        item.text = cardText
                    }
                    return item
                })
                column.input=''
            }
            return column
        })
        this.board$.next([...this.board])
    }
}



/*
    editTask(itemId: number, columnId: number, cardText: string) {
        this.board = this.board.map((column) => {
            if (column.id === columnId) {
                column.input = cardText
            }
            return column
        })
        this.board$.next([...this.board])
    }
*/