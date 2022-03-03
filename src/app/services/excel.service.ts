import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Verb } from '../models/verb';

@Injectable()
export class ExcelService {

  private _uploadedVerbs$ = new Subject<Array<Verb>>();
  private _uploadedNouns$ = new Subject<Array<Verb>>();

  get uploadedVerbs$(): Observable<Array<Verb>> {
    return this._uploadedVerbs$.asObservable();
  }

  get uploadedNouns$(): Observable<Array<Verb>> {
    return this._uploadedNouns$.asObservable();
  }

  public excelToJSON(name: string, file: File): void {
    const reader = new FileReader();
    reader.onload = ((e) => {
      if (e.target == null) {
        return;
      }
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) => {
        switch (name) {
          case 'verbs':
            this._uploadedVerbs$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
            break;
          case 'nouns':
            this._uploadedNouns$.next(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
            break;
          default:
            break;
        }
      });
    });
    reader.readAsBinaryString(file);
  }

}
