import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VerbComponent } from './components/verb/verb.component';
import { DataService } from './services/data.service';
import { AdjectiveComponent } from './components/adjective/adjective.component';
import { NounComponent } from './components/noun/noun.component';
import { PhraseComponent } from './components/phrase/phrase.component';
import { ConjunctionComponent } from './components/conjunction/conjunction.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
