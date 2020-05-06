import {
    ActionReducerMap,
    createAction,
    props,
    createReducer,
    on,
} from "@ngrx/store";

interface AppState {
    [propName: string]: any;
}

export const resetServiceCode = createAction("resetServiceCode", props<{}>());

const reducer = createReducer(
    {},
    on(resetServiceCode, (state, action) => action)
);

export const reducers: ActionReducerMap<AppState> = {
    serviceCode: reducer,
};
