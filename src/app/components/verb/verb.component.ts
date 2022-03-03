import { Component, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { VerbsService } from 'src/app/services/verbs.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html'
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
    this.excelService.uploadedVerbs$.subscribe((verbs: Array<Verb>) => {
      this.verbsService.setVerbs(verbs.filter((verb) => verb?.show !== '-'));
      this.checkData(this.verbsService.verbs);
    });
  }

  public onUploadWords(file: File): void {
    this.excelService.excelToJSON('verbs', file);
  }

  public onReload(): void {
    this.verbsService.initVerbsVariables();
  }

  private checkData(verbs: Array<Verb>): void {
    if (verbs.length < 2) {
      this.verbsService.setIsValidData(false);
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
        this.verbsService.setIsValidData(false);
      }
    });
  }

  public changePriority(priority: string): void {
    this.verbsService.setCounter(0);
    this.verbsService.setFirstNext(true);
    if (priority === '0') {
      this.verbsService.setPriority(undefined);
      this.verbsService.setCurrentVerb(undefined);
    } else {
      this.verbsService.setPriority(+priority);
      this.selectVerbs();
      this.verbsService.setIndex({
        previous: undefined,
        current: this.verbsService.index.current,
        next: undefined
      });
    }
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
