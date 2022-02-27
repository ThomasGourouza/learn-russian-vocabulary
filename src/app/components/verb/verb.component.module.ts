import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { ExcelService } from 'src/app/services/excel.service';
import { VerbComponent } from './verb.component';

@NgModule({
  declarations: [
    VerbComponent
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
    DataService,
    ExcelService
  ],
  exports: [
    VerbComponent
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VerbModule { }
