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

import { NavigationComponent } from './components/navigation/navigation.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InfoComponent } from './components/info/info.component';
import { InfoVerbsComponent } from './components/info/info-verbs/info-verbs.component';
import { InfoNounsComponent } from './components/info/info-nouns/info-nouns.component';

import { ExcelService } from './services/excel.service';
import { NavigationService } from './services/navigation.service';
import { VerbsService } from './services/verbs.service';
import { NounsService } from './services/nouns.service';

import { FileUploadModule } from 'primeng/fileupload';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InteractiveTableComponent } from './components/interactive-table/interactive-table.component';

@NgModule({
  declarations: [
    AppComponent,
    VerbComponent,
    AdjectiveComponent,
    NounComponent,
    PhraseComponent,
    ConjunctionComponent,
    NavigationComponent,
    WelcomeComponent,
    InfoComponent,
    InfoVerbsComponent,
    InfoNounsComponent,
    InteractiveTableComponent
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
    NavigationService,
    VerbsService,
    NounsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
