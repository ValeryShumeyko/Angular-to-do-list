import { createAction, props } from "@ngrx/store";
import { ColumnModel, TodoModel } from "./todos.states";

const addTaskAction = createAction("[TODO] ADD_TASK", props<{columnId: number; text: string}>())
const updateTaskAction = createAction("[TODO] UPDATE_TASK", props<{itemId: number, columnId: number; itemText: string}>())
const deleteTaskAction = createAction("[TODO] DELETE_TASK", props<{columnId: number; itemId: number}>())
const addColumnAction = createAction("[TODO] ADD_COLUMN", props<{text: string}>())
const deleteColumnAction = createAction("[TODO] DELETE_COLUMN", props<{columnId: number}>())

export const actions = {addTaskAction, updateTaskAction, deleteTaskAction, addColumnAction, deleteColumnAction};