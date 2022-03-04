import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Verb } from '../models/verb';
import { Noun } from '../models/noun';
import { Adjective } from '../models/adjective';
import { Conjunction } from '../models/conjunction';
import { Phrase } from '../models/phrase';

@Injectable()
export class ExcelService {

  private _uploadedVerbs$ = new Subject<Array<Verb>>();
  private _uploadedNouns$ = new Subject<Array<Noun>>();
  private _uploadedAdjectives$ = new Subject<Array<Adjective>>();
  private _uploadedConjunctions$ = new Subject<Array<Conjunction>>();
  private _uploadedPhrases$ = new Subject<Array<Phrase>>();
  
  get uploadedVerbs$(): Observable<Array<Verb>> {
    return this._uploadedVerbs$.asObservable();
  }
  get uploadedNouns$(): Observable<Array<Noun>> {
    return this._uploadedNouns$.asObservable();
  }
  get uploadedAdjectives$(): Observable<Array<Adjective>> {
    return this._uploadedAdjectives$.asObservable();
  }
  get uploadedConjunctions$(): Observable<Array<Conjunction>> {
    return this._uploadedConjunctions$.asObservable();
  }
  get uploadedPhrases$(): Observable<Array<Phrase>> {
    return this._uploadedPhrases$.asObservable();
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
        const sheet: Array<any> = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        switch (name) {
          case 'verbes':
            this._uploadedVerbs$.next(sheet);
            break;
          case 'noms':
            this._uploadedNouns$.next(sheet);
            break;
          case 'adjectifs':
            this._uploadedAdjectives$.next(sheet);
            break;
          case 'conjonctions':
            this._uploadedConjunctions$.next(sheet);
            break;
          case 'expressions':
            this._uploadedPhrases$.next(sheet);
            break;
          default:
            break;
        }
      });
    });
    reader.readAsBinaryString(file);
  }

}
