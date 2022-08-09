import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Verb } from '../models/verb';
import { Noun } from '../models/noun';
import { Adjective } from '../models/adjective';
import { Conjunction } from '../models/conjunction';
import { Phrase } from '../models/phrase';
import { Adverb } from '../models/adverb';

@Injectable()
export class ExcelService {

  private _uploadedVerbs$ = new Subject<Array<Verb>>();
  private _uploadedNouns$ = new Subject<Array<Noun>>();
  private _uploadedAdjectives$ = new Subject<Array<Adjective>>();
  private _uploadedConjunctions$ = new Subject<Array<Conjunction>>();
  private _uploadedAdverbs$ = new Subject<Array<Adverb>>();
  private _uploadedPhrases$ = new Subject<Array<Phrase>>();
  private _priorities$ = new Subject<Array<number>>();
  private _priorities: Array<number> = [];
  
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
  get uploadedAdverbs$(): Observable<Array<Adverb>> {
    return this._uploadedAdverbs$.asObservable();
  }
  get uploadedPhrases$(): Observable<Array<Phrase>> {
    return this._uploadedPhrases$.asObservable();
  }
  get priorities$(): Observable<Array<number>> {
    return this._priorities$.asObservable();
  }
  get priorities(): Array<number> {
    return this._priorities;
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
        const priorities: Array<number> = [];
        sheet?.map((item) => item?.priority)?.forEach((priority: number) => {
          if (!priorities.includes(priority)) {
            priorities.push(priority);
          }
        });
        this._priorities$.next(priorities);
        this._priorities = priorities;
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
          case 'adverbes':
            this._uploadedAdverbs$.next(sheet);
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
