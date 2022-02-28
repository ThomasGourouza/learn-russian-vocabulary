import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit {

  @Output() somename = new EventEmitter();

  private verbs: Array<Verb>;
  private selectedVerbs: Array<Verb>;
  public currentVerb: Verb | undefined;
  public index: { previous: number | undefined; current: number | undefined; next: number | undefined; };
  public firstNext: boolean;
  public priority: number;
  public counter: number;

  constructor(
    private excelService: ExcelService
  ) {
    this.verbs = [];
    this.selectedVerbs = [];
    this.index = { previous: undefined, current: undefined, next: undefined };
    this.firstNext = true;
    this.priority = 3;
    this.counter = 0;
  }

  ngOnInit(): void {
    this.excelService.uploadedWords$.subscribe((words: Array<Verb>) => {
      this.verbs = words;
      this.selectVerbs(this.priority);
      this.next();
    });
  }

  private selectVerbs(priority: number): void {
    this.selectedVerbs = this.verbs.filter((verb) => !!verb.priority && +verb.priority === +priority);
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
    } else {
      this.counter++;
    }
  }

  public previous(): void {
    if (this.index.previous !== undefined) {
      if (this.firstNext) {
        this.counter--;
      } else {
        this.firstNext = true;
      }
      this.index.next = this.index.current;
      this.index.current = this.index.previous;
      this.index.previous = undefined;
      this.select();
    }
  }

  public onUploadWords(file: File): void {
    this.excelService.excelToJSON(file);
  }

  private select(): void {
    if (this.index.current !== undefined) {
      this.currentVerb = this.selectedVerbs[this.index.current];
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
