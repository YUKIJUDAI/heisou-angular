import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    createAction,
    props,
    createReducer,
    on,
} from "@ngrx/store";

interface AppState {
    serviceCode: { [propName: string]: any };
}

const resetServiceCode = createAction(
    "resetServiceCode",
    props<{ serviceCode }>()
);

const reducer = createReducer(
    { serviceCode: {} },
    on(resetServiceCode, (state, action) => ({
        serviceCode: action.serviceCode,
    }))
);

const getServiceCodeState = createFeatureSelector("serviceCodeState");

export const getServiceCode = createSelector(
    getServiceCodeState,
    (state: any) => state.serviceCode
);

export const reducers: ActionReducerMap<AppState> = {
    serviceCode: reducer,
};
