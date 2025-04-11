import { Action, createAction, props } from "@ngrx/store";
//export type CounterActions= IncrementAction;
 
  export const increment = createAction 
 ('[Counter] Increment' , props<{value:number}>())

  
 export const decrement = createAction 
 ('[Counter] Decrement' , props<{value:number}>())
 
 export const init = createAction('[Counter] Init', props<{value:number}>()); 
 export const set = createAction('[Counter] Set', props<{value:number}>());

// export const INCREMENT = '[Counter] Increment';
// export class IncrementAction implements Action{
//     readonly type = '[Counter] Increment';
//     constructor(public value :number){}
// }


