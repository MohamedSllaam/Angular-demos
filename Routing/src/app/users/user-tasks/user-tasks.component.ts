import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
}) 
export class UserTasksComponent implements OnInit {
  userName2 =input.required<string>()
  private activatedRoute= inject(ActivatedRoute);
  userId= input.required<string>();
  private userSerives= inject(UsersService);
  private destroyRef= inject(DestroyRef);
  userName='';
  message= input.required<string>();

  // userName = computed(
  //   () => this.userSerives.users.find((u)=> u.id === this.userId()) ?.name 
  // );
  ngOnInit(): void {
     this.activatedRoute.data.subscribe({
      next:data=>{
         console.log(data)
      }
     })
    console.log('Input Data ' + this.message());
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
    const  subscription= this.activatedRoute.paramMap.subscribe({
     next:(paramMap)=>{
        this.userName= 
        this.userSerives.users.find((u)=> u.id === paramMap.get('userId'))?.name || '' 
     }   
    })
     this.destroyRef.onDestroy(()=> subscription.unsubscribe())
   } 
 
}

export const resolveUserName : ResolveFn<string> =(
  activatedRoute:ActivatedRouteSnapshot,
  routerState:RouterStateSnapshot
 ) =>{
  const userService = inject(UsersService);
  const  userName = 
  userService.users.find(u=> u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
 };

 export const resolveTitle : ResolveFn<string> =(
  activatedRoute:ActivatedRouteSnapshot,
  routerState:RouterStateSnapshot
 ) =>{
 
  return resolveUserName(activatedRoute,routerState) + '\'s Tasks';
 };