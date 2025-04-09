import { Routes } from "@angular/router";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { NotFoundComponent } from "../not-found/not-found.component";

 

export const userRoutes:Routes = [
    {
 path:'',
redirectTo:'tasks',
pathMatch:'full'

},
{path:'tasks/new', 
    component: NewTaskComponent
    ,canDeactivate :[canLeaveEditPage]
}, 
{path:'tasks', 
    component: TasksComponent,
    runGuardsAndResolvers:'always',

resolve: 
{
        userTasks :resolveUserTasks
}

} ,
   {path:'**', 
    component: NotFoundComponent
  } , 
];