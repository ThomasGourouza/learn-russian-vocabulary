import { Injectable } from '@angular/core';
import { Index } from '../models';
import { Noun } from '../models/noun';

@Injectable()
export class NounsService {

  private _nouns!: Array<Noun>;
  private _selectedNouns!: Array<Noun>;
  private _currentNoun!: Noun | undefined;
  private _index!: Index;
  private _firstNext!: boolean;
  private _priority!: number | undefined;
  private _counter!: number;
  private _isValidData!: boolean;

  constructor() {
    this.initNounsVariables();
  }

  public initNounsVariables(): void {
    this._nouns = [];
    this._selectedNouns = [];
    this._currentNoun = undefined;
    this._index = { previous: undefined, current: undefined, next: undefined };
    this._firstNext = true;
    this._priority = undefined;
    this._counter = 0;
    this._isValidData = true;
  }

  get nouns(): Array<Noun> {
    return this._nouns;
  }
  public setNouns(nouns: Array<Noun>): void {
    this._nouns = nouns;
  }

  get selectedNouns(): Array<Noun> {
    return this._selectedNouns;
  }
  public setSelectedNouns(selectedNouns: Array<Noun>): void {
    this._selectedNouns = selectedNouns;
  }

  get currentNoun(): Noun | undefined {
    return this._currentNoun;
  }
  public setCurrentNoun(currentNoun: Noun | undefined): void {
    this._currentNoun = currentNoun;
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

  get priority(): number | undefined {
    return this._priority;
  }
  public setPriority(priority: number | undefined): void {
    this._priority = priority;
  }

  get counter(): number {
    return this._counter;
  }
  public setCounter(counter: number): void {
    this._counter = counter;
  }

  get isValidData(): boolean {
    return this._isValidData;
  }
  public setIsValidData(isValidData: boolean): void {
    this._isValidData = isValidData;
  }

}
