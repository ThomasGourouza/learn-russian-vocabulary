import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { AdjectiveComponent } from './components/adjective/adjective.component';
import { NounComponent } from './components/noun/noun.component';
import { PhraseComponent } from './components/phrase/phrase.component';
import { ConjunctionComponent } from './components/conjunction/conjunction.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from './services/excel.service';
import { VerbModule } from './components/verb/verb.component.module';

@NgModule({
  declarations: [
    AppComponent,
    AdjectiveComponent,
    NounComponent,
    PhraseComponent,
    ConjunctionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VerbModule
  ],
  providers: [
    DataService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
