import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { VerbComponent } from './components/verb/verb.component';
import { NounComponent } from './components/noun/noun.component';
import { AdjectiveComponent } from './components/adjective/adjective.component';
import { ConjunctionComponent } from './components/conjunction/conjunction.component';
import { PhraseComponent } from './components/phrase/phrase.component';

import { InteractiveTableComponent } from './components/interactive-table/interactive-table.component';
import { TableVerbComponent } from './components/interactive-table/table-verb/table-verb.component';
import { TableNounComponent } from './components/interactive-table/table-noun/table-noun.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InfoComponent } from './components/info/info.component';
import { InfoContentComponent } from './components/info/info-content/info-content.component';

import { ExcelService } from './services/excel.service';
import { NavigationService } from './services/navigation.service';
import { VerbsService } from './services/verbs.service';
import { NounsService } from './services/nouns.service';
import { AdjectivesService } from './services/adjectives.service';
import { ConjunctionsService } from './services/conjunctions.service';
import { AdverbsService } from './services/adverbs.service';
import { PhrasesService } from './services/phrases.service';
import { GlobalService } from './services/global.service';

import { FileUploadModule } from 'primeng/fileupload';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableDefaultComponent } from './components/interactive-table/table-default/table-default.component';
import { TableConjunctionComponent } from './components/interactive-table/table-conjunction/table-conjunction.component';
import { AdverbComponent } from './components/adverb/adverb.component';
import { TimePipe } from './pipes/time.pipe';
import { ReaderSpeakerService } from './services/reader-speaker.service';

@NgModule({
  declarations: [
    AppComponent,
    VerbComponent,
    AdjectiveComponent,
    NounComponent,
    PhraseComponent,
    ConjunctionComponent,
    InteractiveTableComponent,
    TableVerbComponent,
    TableNounComponent,
    NavigationComponent,
    WelcomeComponent,
    InfoComponent,
    InfoContentComponent,
    TableDefaultComponent,
    TableConjunctionComponent,
    AdverbComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TabMenuModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [
    ExcelService,
    ReaderSpeakerService,
    NavigationService,
    VerbsService,
    NounsService,
    AdjectivesService,
    ConjunctionsService,
    AdverbsService,
    PhrasesService,
    GlobalService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
