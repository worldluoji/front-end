export interface Action {
    type: string,
    payload: {
        modalId: string,
        args?: boolean,
        force?: boolean,
    }
}