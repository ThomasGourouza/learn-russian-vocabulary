import { Component, OnDestroy, OnInit } from '@angular/core';
import { Adverb } from 'src/app/models/adverb';
import { AdverbsService } from 'src/app/services/adverbs.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-adverb',
  templateUrl: './adverb.component.html'
})
export class AdverbComponent implements OnInit, OnDestroy {

  private excelSubscription = new Subscription();

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public adverbsService: AdverbsService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {
    this.navigationService.setTabIndex(this.adverbsService.tabIndex);
  }

  ngOnInit(): void {
    this.excelSubscription = this.excelService.uploadedAdverbs$.subscribe((adverbs: Array<Adverb>) => {
      this.adverbsService.setData(adverbs.filter((adverb) => adverb?.show !== '-'));
      this.checkData(this.adverbsService.data);
    });
  }

  ngOnDestroy(): void {
    this.excelSubscription.unsubscribe();
  }

  public onReload(): void {
    this.adverbsService.initAdverbsVariables();
    this.messageService.add({
      severity: 'warn',
      summary: `${this.adverbsService.name.charAt(0).toUpperCase()}${this.adverbsService.name.slice(1)} éffacés.`
    });
  }

  private checkData(adverbs: Array<Adverb>): void {
    if (adverbs.length < 2) {
      this.adverbsService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const keys = Object.keys(adverbs[0]);
    keys.forEach((key) => {
      if (!this.adverbsService.validKeys.includes(key)) {
        this.adverbsService.setIsValidData(false);
      }
    });
    const message = (this.adverbsService.isValidData) ?
      { severity: 'info', summary: Text.validAdverbsText, detail: Text.selectPriorityText }
      : { severity: 'error', summary: Text.invalidText, detail: Text.removeText };
    this.messageService.add(message);
  }

  public onChangePriority(priority: string): void {
    this.adverbsService.setCounter(0);
    this.adverbsService.setFirstNext(true);
    if (priority === '0') {
      this.adverbsService.setPriority(undefined);
      this.adverbsService.setCurrentItem(undefined);
    } else {
      this.adverbsService.setPriority(+priority);
      this.selectAdverbs();
      this.adverbsService.setIndex({
        previous: undefined,
        current: this.adverbsService.index.current,
        next: undefined
      });
    }
  }

  public onNext(): void {
    if (this.adverbsService.selectedData.length > 1) {
      this.adverbsService.setFirstNext(!this.adverbsService.firstNext)
      if (!this.adverbsService.firstNext) {
        const index: Index = {
          previous: this.adverbsService.index.current,
          current: undefined,
          next: undefined
        };
        if (this.adverbsService.index.next !== undefined) {
          index.current = this.adverbsService.index.next;
        } else {
          index.current = this.globalService.getNext(this.adverbsService.selectedData.length);
        }
        this.adverbsService.setIndex(index);
        this.selectCurrentItem();
      } else {
        this.adverbsService.setCounter(this.adverbsService.counter + 1);
      }
    }
  }

  public onPrevious(): void {
    if (this.adverbsService.index.previous !== undefined) {
      if (this.adverbsService.firstNext) {
        this.adverbsService.setCounter(this.adverbsService.counter - 1);
      } else {
        this.adverbsService.setFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.adverbsService.index.previous,
        next: this.adverbsService.index.current
      };
      this.adverbsService.setIndex(index);
      this.selectCurrentItem();
    }
  }

  private selectAdverbs(): void {
    if (this.adverbsService.priority !== undefined) {
      this.adverbsService.setCurrentItem(undefined);
      const priority = +this.adverbsService.priority;
      const selectedData = this.adverbsService.data.filter((adverb) =>
        +adverb.priority === priority
      );
      this.adverbsService.setSelectedData(selectedData);
      this.onNext();
    }
  }

  private selectCurrentItem(): void {
    const currentIndex = this.adverbsService.index.current;
    if (currentIndex !== undefined) {
      this.adverbsService.setCurrentItem(this.adverbsService.selectedData[currentIndex]);
    }
  }

}
