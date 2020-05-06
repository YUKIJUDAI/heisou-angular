import { createAction, props, createReducer, on } from "@ngrx/store";

interface AppState {
    [propName: string]: any;
}

export const setServiceCode = createAction("setServiceCode", props<{}>());

const reducer = createReducer(
    {},
    on(setServiceCode, (state: AppState, action: {}) => action)
);

export function reducers(state, action) {
    return reducer(state, action);
}
