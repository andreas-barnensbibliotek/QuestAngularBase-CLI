import { QuestMainComponent } from './quest-main/quest-main.component';
import { QuestListComponent } from './quest-list/quest-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', component: QuestListComponent},
  {path:'list', component: QuestListComponent},
  {path:'detail', component: QuestMainComponent},    
  {path:'detail/:id', component: QuestMainComponent},        
  {path:'**', component: QuestListComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
