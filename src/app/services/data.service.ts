import { Injectable } from '@angular/core';
import { Verb } from '../models/verb';

@Injectable()
export class DataService {

  private _verbs: Array<Verb> = [];

  get verbs(): Array<Verb> {
    return this._verbs;
  }

  public setVerbs(verbs: Array<Verb>): void {
    this._verbs = verbs;
  }

}
