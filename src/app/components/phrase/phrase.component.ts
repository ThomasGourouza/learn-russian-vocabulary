import { Component, OnDestroy, OnInit } from '@angular/core';
import { Phrase } from 'src/app/models/phrase';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html'
})
export class PhraseComponent implements OnInit, OnDestroy {

  private excelSubscription = new Subscription();

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public phrasesService: PhrasesService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {
    this.navigationService.setTabIndex(this.phrasesService.tabIndex);
  }

  ngOnInit(): void {
    this.excelSubscription = this.excelService.uploadedPhrases$.subscribe((phrases: Array<Phrase>) => {
      this.phrasesService.setData(phrases.filter((phrase) => phrase?.show !== '-'));
      this.checkData(this.phrasesService.data);
    });
  }

  ngOnDestroy(): void {
    this.excelSubscription.unsubscribe();
  }

  public onReload(): void {
    this.phrasesService.initPhrasesVariables();
    this.messageService.add({
      severity: 'warn',
      summary: `${this.phrasesService.name.charAt(0).toUpperCase()}${this.phrasesService.name.slice(1)} éffacés.`
    });
  }

  private checkData(phrases: Array<Phrase>): void {
    if (phrases.length < 2) {
      this.phrasesService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const keys = Object.keys(phrases[0]);
    keys.forEach((key) => {
      if (!this.phrasesService.validKeys.includes(key)) {
        this.phrasesService.setIsValidData(false);
      }
    });
    const message = (this.phrasesService.isValidData) ?
      { severity: 'info', summary: Text.validPhrasesText, detail: Text.selectPriorityText }
      : { severity: 'error', summary: Text.invalidText, detail: Text.removeText };
    this.messageService.add(message);
  }

  public onChangePriority(priority: string): void {
    this.phrasesService.setCounter(0);
    this.phrasesService.setFirstNext(true);
    if (priority === '0') {
      this.phrasesService.setPriority(undefined);
      this.phrasesService.setCurrentItem(undefined);
    } else {
      this.phrasesService.setPriority(+priority);
      this.selectPhrases();
      this.phrasesService.setIndex({
        previous: undefined,
        current: this.phrasesService.index.current,
        next: undefined
      });
    }
  }

  public onNext(): void {
    if (this.phrasesService.selectedData.length > 1) {
      this.phrasesService.setFirstNext(!this.phrasesService.firstNext)
      if (!this.phrasesService.firstNext) {
        const index: Index = {
          previous: this.phrasesService.index.current,
          current: undefined,
          next: undefined
        };
        if (this.phrasesService.index.next !== undefined) {
          index.current = this.phrasesService.index.next;
        } else {
          index.current = this.globalService.getNext(this.phrasesService.selectedData.length);
        }
        this.phrasesService.setIndex(index);
        this.selectCurrentItem();
      } else {
        this.phrasesService.setCounter(this.phrasesService.counter + 1);
      }
    }
  }

  public onPrevious(): void {
    if (this.phrasesService.index.previous !== undefined) {
      if (this.phrasesService.firstNext) {
        this.phrasesService.setCounter(this.phrasesService.counter - 1);
      } else {
        this.phrasesService.setFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.phrasesService.index.previous,
        next: this.phrasesService.index.current
      };
      this.phrasesService.setIndex(index);
      this.selectCurrentItem();
    }
  }

  private selectPhrases(): void {
    if (this.phrasesService.priority !== undefined) {
      this.phrasesService.setCurrentItem(undefined);
      const priority = +this.phrasesService.priority;
      const selectedData = this.phrasesService.data.filter((phrase) =>
        +phrase.priority === priority
      );
      this.phrasesService.setSelectedData(selectedData);
      this.onNext();
    }
  }

  private selectCurrentItem(): void {
    const currentIndex = this.phrasesService.index.current;
    if (currentIndex !== undefined) {
      this.phrasesService.setCurrentItem(this.phrasesService.selectedData[currentIndex]);
    }
  }

}
