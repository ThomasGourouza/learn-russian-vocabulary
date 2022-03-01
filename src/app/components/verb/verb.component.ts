import { Component, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { VerbsService } from 'src/app/services/data.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
export interface Index {
  previous: number | undefined;
  current: number | undefined;
  next: number | undefined;
}

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit {

  public currentVerb: Verb | undefined;
  public index: Index;
  public firstNext: boolean;
  public priority: number;
  public counter: number;

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    private verbsService: VerbsService
  ) {
    this.navigationService.setTabIndex(1);

    this.currentVerb = this.verbsService.currentVerb;
    this.index = this.verbsService.index;
    this.firstNext = this.verbsService.firstNext;
    this.priority = this.verbsService.priority;
    this.counter = this.verbsService.counter;
  }

  ngOnInit(): void {
    this.excelService.uploadedWords$.subscribe((verbs: Array<Verb>) => {
      this.updateVerbs(verbs);
      this.selectVerbs(this.priority);
      this.next();
    });
  }

  public onUploadWords(file: File): void {
    this.excelService.excelToJSON(file);
  }

  public changePriority(priority: number): void {
    this.updatePriority(priority);
    this.selectVerbs(priority);
    const index = {
      previous: undefined,
      current: this.index.current,
      next: undefined
    }
    this.updateIndex(index);
  }

  public next(): void {
    this.updateFirstNext(!this.firstNext)
    if (!this.firstNext) {
      const index: Index = {
        previous: this.index.current,
        current: undefined,
        next: undefined
      };
      if (this.index.next !== undefined) {
        index.current = this.index.next;
      } else {
        do {
          index.current = this.getRandomInt(this.verbsService.selectedVerbs.length);
        } while (index.current === index.previous);
      }
      this.updateIndex(index);
      this.selectCurrentVerb();
    } else {
      this.updateCounter(this.counter + 1);
    }
  }

  public previous(): void {
    if (this.index.previous !== undefined) {
      if (this.firstNext) {
        this.updateCounter(this.counter - 1);
      } else {
        this.updateFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.index.previous,
        next: this.index.current
      };
      this.updateIndex(index);
      this.selectCurrentVerb();
    }
  }

  private selectVerbs(priority: number): void {
    const selectedVerbs = this.verbsService.verbs.filter((verb) => !!verb.priority && +verb.priority === +priority);
    this.updateSelectedVerbs(selectedVerbs);
  }

  private selectCurrentVerb(): void {
    if (this.index.current !== undefined) {
      this.updateCurrentVerb(this.verbsService.selectedVerbs[this.index.current]);
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private updateVerbs(verbs: Array<Verb>): void {
    this.verbsService.setVerbs(verbs);
  }
  private updateSelectedVerbs(selectedVerbs: Array<Verb>): void {
    this.verbsService.setSelectedVerbs(selectedVerbs);
  }
  private updateCurrentVerb(currentVerb: Verb): void {
    this.currentVerb = currentVerb;
    this.verbsService.setCurrentVerb(currentVerb);
  }
  private updateIndex(index: Index): void {
    this.index = index;
    this.verbsService.setIndex(index);
  }
  private updateFirstNext(firstNext: boolean): void {
    this.firstNext = firstNext;
    this.verbsService.setFirstNext(firstNext);
  }
  private updatePriority(priority: number): void {
    this.priority = priority;
    this.verbsService.setPriority(priority);
  }
  private updateCounter(counter: number): void {
    this.counter = counter;
    this.verbsService.setCounter(counter);
  }

}
