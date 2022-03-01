import { Injectable } from '@angular/core';
import { Index } from '../components/verb/verb.component';
import { Verb } from '../models/verb';

@Injectable()
export class VerbsService {

  private _verbs: Array<Verb>;
  private _selectedVerbs: Array<Verb>;
  private _currentVerb: Verb | undefined;
  private _index: Index;
  private _firstNext: boolean;
  private _priority: number;
  private _counter: number;

  constructor() {
    this._verbs = [];
    this._selectedVerbs = [];
    this._index = { previous: undefined, current: undefined, next: undefined };
    this._firstNext = true;
    this._priority = 3;
    this._counter = 0;
  }

  get verbs(): Array<Verb> {
    return this._verbs;
  }
  public setVerbs(verbs: Array<Verb>): void {
    this._verbs = verbs;
  }

  get selectedVerbs(): Array<Verb> {
    return this._selectedVerbs;
  }
  public setSelectedVerbs(selectedVerbs: Array<Verb>): void {
    this._selectedVerbs = selectedVerbs;
  }

  get currentVerb(): Verb | undefined {
    return this._currentVerb;
  }
  public setCurrentVerb(currentVerb: Verb): void {
    this._currentVerb = currentVerb;
  }

  get index(): Index {
    return this._index;
  }
  public setIndex(index: Index): void {
    this._index = index;
  }

  get firstNext(): boolean {
    return this._firstNext;
  }
  public setFirstNext(firstNext: boolean): void {
    this._firstNext = firstNext;
  }

  get priority(): number {
    return this._priority;
  }
  public setPriority(priority: number): void {
    this._priority = priority;
  }

  get counter(): number {
    return this._counter;
  }
  public setCounter(counter: number): void {
    this._counter = counter;
  }

}
