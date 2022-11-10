import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Card, Column } from "../models/column.model";
import { actions } from "./todos.actions";
import { board } from "./todos.states";


export const todoReducer = createReducer(

    board, 
    on(actions.updateTaskAction, (state, {itemId, columnId, itemText}) => {
        return updateTask(state, itemId, columnId, itemText);
    }),
    on(actions.addTaskAction, (state, {columnId, text}) => {
        return addTask(state, columnId, text)
    }),
    on(actions.deleteTaskAction, (state, {columnId, itemId}) => {
        return deleteTask(state, columnId, itemId)
    }),
    on(actions.addColumnAction, (state, {text}) => {
        return addColumn(state, text)
    }),
    on(actions.deleteColumnAction, (state, {columnId}) => {
        return deleteColumn(state, columnId)
    }),
)


function addTask(state: any, columnId: number, text: string) {
    let columnid = state.findIndex((column: any)=> column.id == columnId)
    var tempStates = [...state]
    let column = tempStates[columnid]
    const newTask: Card = {
        id: Date.now(),
        text,
    }
    column.list = [...state[columnid].list, newTask];
    return [...tempStates]
}

function deleteTask(state: any, columnId: number, itemId: number) {
    let columnid = state.findIndex((column: any)=> column.id == columnId)
    var tempStates = [...state];
    var tempList = [...tempStates[columnid].list]
    let itemid = tempList.findIndex((item: any) => item.id == itemId)
    if(itemid != -1) {
        tempList = tempList.filter((item: any) => item.id !==itemId);
    }
    return [...tempStates];
}

function addColumn(state: any, text: string) {
    const newColumn: Column = {
        id: Date.now(),
        title: text,
        list: [],
        isOpenFormAddTask: false,
        input: '',
    };
    state = [ ...state, newColumn];
    return state
}


function deleteColumn(state: any, columnId: number) {
    state = state.filter((column: Column) => column.id !==columnId);
    return state
}

function updateTask(state: any, itemId: number, columnId: number, itemText: string) {
    let columnIndex = state.findIndex((column: any)=> column.id == columnId);
    var tempStates = [...state];
    if(columnIndex != -1) {
        let itemIndex = tempStates[columnIndex].list.findIndex((item: any) => item.id == itemId);
        if(itemIndex != 1) {
            tempStates[columnIndex].list[itemIndex].text = itemText;
        }
    }
    return state;
}

export const todosSelector = createSelector(createFeatureSelector("board"),
    (board: Column[]) => board
);


















    /*
    let tempTodoIndex = state.findIndex((task: any)=> task.id == payload.id);
    var tempStates = [...state];
    if(tempTodoIndex != -1) {
        tempStates[tempTodoIndex] = payload;
    }
    return [...tempStates];
    */