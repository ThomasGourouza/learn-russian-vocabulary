import { Injectable } from '@angular/core';
import { Index } from '../models';
import { Phrase } from '../models/phrase';

@Injectable()
export class PhrasesService {

  private _name: string;
  private _tabIndex: number;
  private _data!: Array<Phrase>;
  private _selectedData!: Array<Phrase>;
  private _currentItem!: Phrase | undefined;
  private _index!: Index;
  private _firstNext!: boolean;
  private _priority!: number | undefined;
  private _counter!: number;
  private _isValidData!: boolean;
  private _validKeys: Array<string>;

  constructor() {
    this._name = 'expressions';
    this._tabIndex = 5;
    this._validKeys = [
      'french',
      'russian',
      'priority',
      'show'
    ];
    this.initPhrasesVariables();
  }

  public initPhrasesVariables(): void {
    this._data = [];
    this._selectedData = [];
    this._currentItem = undefined;
    this._index = { previous: undefined, current: undefined, next: undefined };
    this._firstNext = true;
    this._priority = undefined;
    this._counter = 0;
    this._isValidData = true;
  }

  get data(): Array<Phrase> {
    return this._data;
  }
  public setData(data: Array<Phrase>): void {
    this._data = data;
  }

  get selectedData(): Array<Phrase> {
    return this._selectedData;
  }
  public setSelectedData(selectedData: Array<Phrase>): void {
    this._selectedData = selectedData;
  }

  get currentItem(): Phrase | undefined {
    return this._currentItem;
  }
  public setCurrentItem(currentItem: Phrase | undefined): void {
    this._currentItem = currentItem;
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

  get validKeys(): Array<string> {
    return this._validKeys;
  }
  get name(): string {
    return this._name;
  }
  get tabIndex(): number {
    return this._tabIndex;
  }

}
