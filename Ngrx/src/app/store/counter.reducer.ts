import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { decrement, increment, set  } from "./counter.action";
 

const initialState =1;

// // export const counterReducer= createReducer(initialState);
// export function createrReducer( state= initialState){
// return state;
// };


export const counterReducer = createReducer(
    initialState , 
    on (increment , (state, action) => state + action.value ),
    on (decrement , (state, action) => state - action.value ),
    on (set , (state, action) => action.value ),
);

// export const counterReducer= createReducer(initialState);
// export function createrReducer( state= initialState , action :any){
//    if(action.type ==='[Counter] Increment'){
//     return state + action.value
//    }
//     return state;
// };
// export type CounterActions= IncrementAction;

// export function counterReducer(state = initialState, action :CounterActions ){
//     if(action.type=== INCREMENT){
//         return state +( action as IncrementAction ).value
//     }
//     return state;

// }