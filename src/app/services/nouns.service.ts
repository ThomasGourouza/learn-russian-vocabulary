import { Injectable } from '@angular/core';
import { Index } from '../models';
import { Noun } from '../models/noun';

@Injectable()
export class NounsService {

  private _name: string;
  private _tabIndex: number;
  private _data!: Array<Noun>;
  private _selectedData!: Array<Noun>;
  private _currentItem!: Noun | undefined;
  private _index!: Index;
  private _firstNext!: boolean;
  private _priority!: number | undefined;
  private _counter!: number;
  private _isValidData!: boolean;
  private _validKeys: Array<string>;

  constructor() {
    this._name = 'noms';
    this._tabIndex = 1;
    this._validKeys = [
      'french',
      'russian',
      'gender',
      'priority',
      'declension',
      'show'
    ];
    this.initNounsVariables();
  }

  public initNounsVariables(): void {
    this._data = [];
    this._selectedData = [];
    this._currentItem = undefined;
    this._index = { previous: undefined, current: undefined, next: undefined };
    this._firstNext = true;
    this._priority = undefined;
    this._counter = 0;
    this._isValidData = true;
  }

  get data(): Array<Noun> {
    return this._data;
  }
  public setData(data: Array<Noun>): void {
    this._data = data;
  }

  get selectedData(): Array<Noun> {
    return this._selectedData;
  }
  public setSelectedData(selectedData: Array<Noun>): void {
    this._selectedData = selectedData;
  }

  get currentItem(): Noun | undefined {
    return this._currentItem;
  }
  public setCurrentItem(currentItem: Noun | undefined): void {
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
