import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  private memory: Array<number> = [];
  private lastInMemory: number | undefined;

  public getNext(length: number): number {
    if (length <= 0) {
      return 0;
    }
    this.lastInMemory = undefined;
    if (this.memory.length === length) {
      this.lastInMemory = this.memory.pop();
      this.memory = [];
    }
    let array: Array<number> = [];
    for (let i = 0; i < length; i++) {
      array.push(i);
    }
    const leftIndexes = array.filter((index) => !this.memory.includes(index));
    let randomIndex = 0;
    do {
      randomIndex = leftIndexes[this.getRandomInt(leftIndexes.length)];
    } while (randomIndex === this.lastInMemory);
    this.memory.push(randomIndex);
    return randomIndex;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
