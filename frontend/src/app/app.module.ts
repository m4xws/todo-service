import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodolistComponent} from './todolist/todolist.component';
import {TododetailComponent} from './tododetail/tododetail.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TododetailComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
