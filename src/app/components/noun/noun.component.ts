import { Component, OnDestroy, OnInit } from '@angular/core';
import { Noun } from 'src/app/models/noun';
import { NounsService } from 'src/app/services/nouns.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html'
})
export class NounComponent implements OnInit, OnDestroy {

  private excelSubscription = new Subscription();

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public nounsService: NounsService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {
    this.navigationService.setTabIndex(this.nounsService.tabIndex);
  }

  ngOnInit(): void {
    this.excelSubscription = this.excelService.uploadedNouns$.subscribe((nouns: Array<Noun>) => {
      this.nounsService.setData(nouns.filter((noun) => noun?.show !== '-'));
      this.checkData(this.nounsService.data);
    });
  }

  ngOnDestroy(): void {
    this.excelSubscription.unsubscribe();
  }

  public onReload(): void {
    this.nounsService.initNounsVariables();
    this.messageService.add({
      severity: 'warn',
      summary: `${this.nounsService.name.charAt(0).toUpperCase()}${this.nounsService.name.slice(1)} éffacés.`
    });
  }

  private checkData(nouns: Array<Noun>): void {
    if (nouns.length < 2) {
      this.nounsService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const keys = Object.keys(nouns[0]);
    keys.forEach((key) => {
      if (!this.nounsService.validKeys.includes(key)) {
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
      this.nounsService.setCurrentItem(undefined);
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
    if (this.nounsService.selectedData.length > 1) {
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
          index.current = this.globalService.getNext(this.nounsService.selectedData.length);
        }
        this.nounsService.setIndex(index);
        this.selectCurrentItem();
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
      this.selectCurrentItem();
    }
  }

  private selectNouns(): void {
    if (this.nounsService.priority !== undefined) {
      this.nounsService.setCurrentItem(undefined);
      const priority = +this.nounsService.priority;
      const selectedData = this.nounsService.data.filter((noun) =>
        +noun.priority === priority
      );
      this.nounsService.setSelectedData(selectedData);
      this.onNext();
    }
  }

  private selectCurrentItem(): void {
    const currentIndex = this.nounsService.index.current;
    if (currentIndex !== undefined) {
      this.nounsService.setCurrentItem(this.nounsService.selectedData[currentIndex]);
    }
  }

}
