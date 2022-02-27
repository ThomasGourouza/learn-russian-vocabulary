import { Component, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit {

  public verbs: Array<Verb>;
  public currentVerb: Verb | undefined;
  private index: { previous: number | undefined; current: number | undefined; next: number | undefined; };
  private firstNext: boolean;

  constructor(
    private dataService: DataService
  ) {
    this.verbs = [];
    this.index = { previous: undefined, current: undefined, next: undefined };
    this.firstNext = true;
  }

  ngOnInit(): void {
    this.dataService.verbs$.subscribe((verbs) => {
      this.verbs = verbs;
      this.next();
    });
  }

  public next(): void {
    this.firstNext = !this.firstNext;
    if (!this.firstNext) {
      this.index.previous = this.index.current;
      if (this.index.next !== undefined) {
        this.index.current = this.index.next;
      } else {
        do {
          this.index.current = this.getRandomInt(this.verbs.length);
        } while (this.index.current === this.index.previous);
      }
      this.index.next = undefined;
      this.select();
    }
  }

  public previous(): void {
    if (this.index.previous !== undefined) {
      this.firstNext = true;
      this.index.next = this.index.current;
      this.index.current = this.index.previous;
      this.index.previous = undefined;
      this.select();
    }
  }

  private select(): void {
    this.currentVerb = this.verbs[this.index.current];
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
