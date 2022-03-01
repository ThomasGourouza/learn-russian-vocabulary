import { Component, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { VerbsService } from 'src/app/services/verbs.service';
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

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public verbsService: VerbsService
  ) {
    this.navigationService.setTabIndex(1);
  }

  ngOnInit(): void {
    this.excelService.uploadedWords$.subscribe((verbs: Array<Verb>) => {
      this.verbsService.setVerbs(verbs.filter((verb) => verb?.hidden !== '-'));
    });
  }

  public onUploadWords(file: File): void {
    this.excelService.excelToJSON(file);
  }

  public onReload(): void {
    this.verbsService.initVerbsVariables();
  }

  public isGoodData(): boolean {
    const verbs = this.verbsService.verbs;
    if (verbs.length < 2) {
      return false;
    }
    const validKeys = [
      'french',
      'imperfective',
      'perfective',
      'undeterminated',
      'priority',
      'conjugation',
      'hidden'
    ];
    const keys = Object.keys(verbs[0]);
    let valid = true;
    keys.forEach((key) => {
      if (!validKeys.includes(key)) {
        valid = false;
      }
    });
    return valid;
  }

  public changePriority(priority: number): void {
    this.verbsService.setPriority(priority);
    this.verbsService.setCounter(0);
    this.verbsService.setFirstNext(true);
    this.selectVerbs();
    this.verbsService.setIndex({
      previous: undefined,
      current: this.verbsService.index.current,
      next: undefined
    });
  }

  public next(): void {
    if (this.verbsService.selectedVerbs.length > 1) {
      this.verbsService.setFirstNext(!this.verbsService.firstNext)
      if (!this.verbsService.firstNext) {
        const index: Index = {
          previous: this.verbsService.index.current,
          current: undefined,
          next: undefined
        };
        if (this.verbsService.index.next !== undefined) {
          index.current = this.verbsService.index.next;
        } else {
          do {
            index.current = this.getRandomInt(this.verbsService.selectedVerbs.length);
          } while (index.current === index.previous);
        }
        this.verbsService.setIndex(index);
        this.selectCurrentVerb();
      } else {
        this.verbsService.setCounter(this.verbsService.counter + 1);
      }
    }
  }

  public previous(): void {
    if (this.verbsService.index.previous !== undefined) {
      if (this.verbsService.firstNext) {
        this.verbsService.setCounter(this.verbsService.counter - 1);
      } else {
        this.verbsService.setFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.verbsService.index.previous,
        next: this.verbsService.index.current
      };
      this.verbsService.setIndex(index);
      this.selectCurrentVerb();
    }
  }

  private selectVerbs(): void {
    if (this.verbsService.priority !== undefined) {
      this.verbsService.setCurrentVerb(undefined);
      const priority = +this.verbsService.priority;
      const selectedVerbs = this.verbsService.verbs.filter((verb) =>
        !!verb.priority && +verb.priority === priority
      );
      this.verbsService.setSelectedVerbs(selectedVerbs);
      this.next();
    }
  }

  private selectCurrentVerb(): void {
    const currentIndex = this.verbsService.index.current;
    if (currentIndex !== undefined) {
      this.verbsService.setCurrentVerb(this.verbsService.selectedVerbs[currentIndex]);
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
