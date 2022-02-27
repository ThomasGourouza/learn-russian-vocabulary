import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Adjective } from '../models/adjective';
import { Conjunction } from '../models/conjunction';
import { Noun } from '../models/noun';
import { Phrase } from '../models/phrase';
import { Verb } from '../models/verb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _verbs$!: Observable<Array<Verb>>;
  private _adjectives$!: Observable<Array<Adjective>>;
  private _conjunctions$!: Observable<Array<Conjunction>>;
  private _nouns$!: Observable<Array<Noun>>;
  private _phrases$!: Observable<Array<Phrase>>;

  constructor(
    private http: HttpClient
  ) {
    this._verbs$ = from(this.getData('verbs'));
    this._adjectives$ = from(this.getData('adjectives'));
    this._conjunctions$ = from(this.getData('conjunctions'));
    this._nouns$ = from(this.getData('nouns'));
    this._phrases$ = from(this.getData('phrases'));
  }

  private async getData(fileName: string): Promise<any> {
    return this.http.get(`assets/data/${fileName}.json`).toPromise();
  }

  get verbs$(): Observable<Array<Verb>> {
    return this._verbs$;
  }
  
  get adjectives$(): Observable<Array<Adjective>> {
    return this._adjectives$;
  }

  get conjunctions$(): Observable<Array<Conjunction>> {
    return this._conjunctions$;
  }

  get nouns$(): Observable<Array<Noun>> {
    return this._nouns$;
  }

  get phrases$(): Observable<Array<Phrase>> {
    return this._phrases$;
  }

}
