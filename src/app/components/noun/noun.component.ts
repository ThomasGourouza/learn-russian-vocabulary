import { Component, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { Noun } from 'src/app/models/noun';
import { NounsService } from 'src/app/services/nouns.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html'
})
export class NounComponent implements OnInit {

  public nouns: Array<Noun>;

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public nounsService: NounsService
  ) {
    this.navigationService.setTabIndex(2);
    this.nouns = [];
  }

  ngOnInit(): void {
    this.excelService.uploadedNouns$.subscribe((verbs: Array<Verb>) => {
      this.nounsService.setVerbs(verbs.filter((verb) => verb?.show !== '-'));
      this.checkData(this.nounsService.verbs);
    });
  }

  public onUploadWords(file: File): void {
    this.excelService.excelToJSON('nouns', file);
  }

  public onReload(): void {
    this.nounsService.initVerbsVariables();
  }

  private checkData(verbs: Array<Verb>): void {
    if (verbs.length < 2) {
      this.nounsService.setIsValidData(false);
      return;
    }
    const validKeys = [
      'french',
      'imperfective',
      'perfective',
      'undeterminated',
      'priority',
      'show',
      'conjugation'
    ];
    const keys = Object.keys(verbs[0]);
    keys.forEach((key) => {
      if (!validKeys.includes(key)) {
        this.nounsService.setIsValidData(false);
      }
    });
  }

  public changePriority(priority: string): void {
    this.nounsService.setCounter(0);
    this.nounsService.setFirstNext(true);
    if (priority === '0') {
      this.nounsService.setPriority(undefined);
      this.nounsService.setCurrentVerb(undefined);
    } else {
      this.nounsService.setPriority(+priority);
      this.selectVerbs();
      this.nounsService.setIndex({
        previous: undefined,
        current: this.nounsService.index.current,
        next: undefined
      });
    }
  }

  public next(): void {
    if (this.nounsService.selectedVerbs.length > 1) {
      this.nounsService.setFirstNext(!this.nounsService.firstNext)
      if (!this.nounsService.firstNext) {
        const index: Index = {
          previous: this.nounsService.index.current,
          current: undefined,
          next: undefined
        };
        if (this.nounsService.index.next !== undefined) {
          index.current = this.nounsService.index.next;
        } else {
          do {
            index.current = this.getRandomInt(this.nounsService.selectedVerbs.length);
          } while (index.current === index.previous);
        }
        this.nounsService.setIndex(index);
        this.selectCurrentVerb();
      } else {
        this.nounsService.setCounter(this.nounsService.counter + 1);
      }
    }
  }

  public previous(): void {
    if (this.nounsService.index.previous !== undefined) {
      if (this.nounsService.firstNext) {
        this.nounsService.setCounter(this.nounsService.counter - 1);
      } else {
        this.nounsService.setFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.nounsService.index.previous,
        next: this.nounsService.index.current
      };
      this.nounsService.setIndex(index);
      this.selectCurrentVerb();
    }
  }

  private selectVerbs(): void {
    if (this.nounsService.priority !== undefined) {
      this.nounsService.setCurrentVerb(undefined);
      const priority = +this.nounsService.priority;
      const selectedVerbs = this.nounsService.verbs.filter((verb) =>
        !!verb.priority && +verb.priority === priority
      );
      this.nounsService.setSelectedVerbs(selectedVerbs);
      this.next();
    }
  }

  private selectCurrentVerb(): void {
    const currentIndex = this.nounsService.index.current;
    if (currentIndex !== undefined) {
      this.nounsService.setCurrentVerb(this.nounsService.selectedVerbs[currentIndex]);
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
