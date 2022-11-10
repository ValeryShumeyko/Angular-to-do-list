export interface Card {
    id: number,
    text: string,
}

export interface Column {
    id: number,
    title: string,
    list: Card[],
    isOpenFormAddTask: boolean,
    input: string,
}