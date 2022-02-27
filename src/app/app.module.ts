import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdjectiveComponent } from './components/adjective/adjective.component';
import { NounComponent } from './components/noun/noun.component';
import { PhraseComponent } from './components/phrase/phrase.component';
import { ConjunctionComponent } from './components/conjunction/conjunction.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from './services/excel.service';
import { VerbComponent } from './components/verb/verb.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    VerbComponent,
    AdjectiveComponent,
    NounComponent,
    PhraseComponent,
    ConjunctionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
