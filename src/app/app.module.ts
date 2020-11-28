import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CocktailsComponent } from './_components/cocktails/cocktails.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { ImagePreviewComponent } from './_components/image-preview/image-preview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    CocktailsComponent,
    ImagePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonToggleModule
  ],
  entryComponents: [ImagePreviewComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
