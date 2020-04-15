import { QuestListComponent } from './quest-list/quest-list.component';
import { CheckboxDirectiveDirective } from './checkbox-directive.directive';
import { QuestMainComponent } from './quest-main/quest-main.component';
import { QuestTriggerComponent } from './quest-trigger/quest-trigger.component';
import { RouterModule } from '@angular/router';
import { AppGlobalErrorHandler } from './../assets/appGlobalErrorHandler';
import { ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../Http/interceptor';
import { DemoService } from '../Service/demo.service';
import { Context } from '../Service/DNN/context.service';

import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,   
    QuestTriggerComponent,
    QuestMainComponent,
    CheckboxDirectiveDirective,
    QuestListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [    
    Context,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    DemoService,
    {provide: ErrorHandler, useClass: AppGlobalErrorHandler}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
