import { NgModule } from "@angular/core";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { MatGridListModule } from '@angular/material/grid-list';

const sharedModules: any[] = [
  FormsModule,
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule, 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule
  
]

@NgModule({
  imports: sharedModules,
  exports: sharedModules
})

export class SharedModule { }