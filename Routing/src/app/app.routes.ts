import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes   } from "./users/users.routes";
import { inject } from "@angular/core";
 
const dummyCanMatch : CanMatchFn = (route , segments) =>{
const router = inject(Router);
const shouldGetAccess = Math.random();
if(shouldGetAccess < 1){
   return true;
}
return new RedirectCommand(router.parseUrl('/unauthorize'))
};
export const routes:Routes = [
    {
 path:'',
 component:NoTaskComponent,
 title: 'No task selected'
//  redirectTo:'/users/u1',
//  pathMatch:'full'
},
 
   {
    path:'users/:userId',
    component:UserTasksComponent , 
    children: userRoutes,
    canMatch:[dummyCanMatch],
 data:{
  message:'Hello'
 }
 , resolve:{
  userName:resolveUserName
 },
 title:resolveTitle
  },
   {path:'**', 
    component: NotFoundComponent
  } , 
];