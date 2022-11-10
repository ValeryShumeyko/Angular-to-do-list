import { Column } from "../models/column.model";

export interface TodoModel {
    id: number;
    title: string;
}

export interface ColumnModel {
    id: number;
    title: string;
    list: any[];
}

export let board: Column[] = [
    {
        id: 1,
        title: 'To Do',
        list: [
            {
                id: 1,
                text: '1 task'
            }
        ],
        isOpenFormAddTask: true,
        input: '',
    },
    {
        id: 2,
        title: 'In progress',
        list: [
            {
                id: 1,
                text: '2 task'
            }
        ],
        isOpenFormAddTask: false,
        input: '',
    },
    {
        id: 3,
        title: 'Done',
        list: [
            {
                id: 1,
                text: '3 task'
            }
        ],
        isOpenFormAddTask: false,
        input: '',
    },
]



/*
export let initialState: TodoModel[] = [
    {
        id: 1,
        title: '1 task',
    },
    {
        id: 2,
        title: '2 task',
    }
]
*/