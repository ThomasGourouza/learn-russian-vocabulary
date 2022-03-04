import { Component, OnInit } from '@angular/core';
import { Noun } from 'src/app/models/noun';
import { NounsService } from 'src/app/services/nouns.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { Message, MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html'
})
export class NounComponent implements OnInit {

  public nouns: Array<Noun>;

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public nounsService: NounsService,
    private messageService: MessageService
  ) {
    this.navigationService.setTabIndex(2);
    this.nouns = [];
  }

  ngOnInit(): void {
    this.excelService.uploadedNouns$.subscribe((nouns: Array<Noun>) => {
      this.nounsService.setNouns(nouns.filter((noun) => noun?.show !== '-'));
      this.checkData(this.nounsService.nouns);
    });
  }

  public onReload(): void {
    this.nounsService.initNounsVariables();
    this.messageService.add({ severity: 'warn', summary: 'Noms éffacés.' });
  }

  private checkData(nouns: Array<Noun>): void {
    if (nouns.length < 2) {
      this.nounsService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const validKeys = [
      'french',
      'russian',
      'gender',
      'priority',
      'declension'
    ];
    const keys = Object.keys(nouns[0]);
    keys.forEach((key) => {
      if (!validKeys.includes(key)) {
        this.nounsService.setIsValidData(false);
      }
    });
    const message = (this.nounsService.isValidData) ?
      { severity: 'info', summary: Text.validNounsText, detail: Text.selectPriorityText }
      : { severity: 'error', summary: Text.invalidText, detail: Text.removeText };
    this.messageService.add(message);
  }

  public onChangePriority(priority: string): void {
    this.nounsService.setCounter(0);
    this.nounsService.setFirstNext(true);
    if (priority === '0') {
      this.nounsService.setPriority(undefined);
      this.nounsService.setCurrentNoun(undefined);
    } else {
      this.nounsService.setPriority(+priority);
      this.selectNouns();
      this.nounsService.setIndex({
        previous: undefined,
        current: this.nounsService.index.current,
        next: undefined
      });
    }
  }

  public onNext(): void {
    if (this.nounsService.selectedNouns.length > 1) {
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
            index.current = this.getRandomInt(this.nounsService.selectedNouns.length);
          } while (index.current === index.previous);
        }
        this.nounsService.setIndex(index);
        this.selectCurrentNoun();
      } else {
        this.nounsService.setCounter(this.nounsService.counter + 1);
      }
    }
  }

  public onPrevious(): void {
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
      this.selectCurrentNoun();
    }
  }

  public print(gender: string): string {
    switch (gender) {
      case 'M':
        return 'Masculin';
      case 'F':
        return 'Féminin';
      case 'N':
        return 'Neutre';
      default:
        return '';
    }
  }

  private selectNouns(): void {
    if (this.nounsService.priority !== undefined) {
      this.nounsService.setCurrentNoun(undefined);
      const priority = +this.nounsService.priority;
      const selectedNouns = this.nounsService.nouns.filter((noun) =>
        +noun.priority === priority
      );
      this.nounsService.setSelectedNouns(selectedNouns);
      this.onNext();
    }
  }

  private selectCurrentNoun(): void {
    const currentIndex = this.nounsService.index.current;
    if (currentIndex !== undefined) {
      this.nounsService.setCurrentNoun(this.nounsService.selectedNouns[currentIndex]);
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
