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
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { NavigationService } from './services/navigation.service';
import { VerbsService } from './services/verbs.service';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    VerbComponent,
    AdjectiveComponent,
    NounComponent,
    PhraseComponent,
    ConjunctionComponent,
    NavigationComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TabMenuModule,
    ButtonModule
  ],
  providers: [
    ExcelService,
    NavigationService,
    VerbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
