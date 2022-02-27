import { Component, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit {

  private verbs: Array<Verb>;
  private selectedVerbs: Array<Verb>;
  public currentVerb: Verb | undefined;
  public index: { previous: number | undefined; current: number | undefined; next: number | undefined; };
  private firstNext: boolean;
  public priority: number;

  constructor(
    private dataService: DataService
  ) {
    this.verbs = [];
    this.selectedVerbs = [];
    this.index = { previous: undefined, current: undefined, next: undefined };
    this.firstNext = true;
    this.priority = 1;
  }

  ngOnInit(): void {
    this.dataService.verbs$.subscribe((verbs) => {
      this.verbs = verbs;
      this.selectVerbs(this.priority);
      this.next();
    });
  }

  private selectVerbs(priority: number): void {
    this.selectedVerbs = this.verbs.filter((verb) => +verb.priority === +priority);
  }

  public changePriority(priority: number): void {
    this.selectVerbs(priority);
    this.index.previous = undefined;
    this.index.next = undefined;
  }

  public next(): void {
    this.firstNext = !this.firstNext;
    if (!this.firstNext) {
      this.index.previous = this.index.current;
      if (this.index.next !== undefined) {
        this.index.current = this.index.next;
      } else {
        do {
          this.index.current = this.getRandomInt(this.selectedVerbs.length);
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
    this.currentVerb = this.selectedVerbs[this.index.current];
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
