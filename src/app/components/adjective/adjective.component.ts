import { Component, OnDestroy, OnInit } from '@angular/core';
import { Adjective } from 'src/app/models/adjective';
import { AdjectivesService } from 'src/app/services/adjectives.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-adjective',
  templateUrl: './adjective.component.html'
})
export class AdjectiveComponent implements OnInit, OnDestroy {

  private excelSubscription = new Subscription();

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public adjectivesService: AdjectivesService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {
    this.navigationService.setTabIndex(this.adjectivesService.tabIndex);
  }

  ngOnInit(): void {
    this.excelSubscription = this.excelService.uploadedAdjectives$.subscribe((adjectives: Array<Adjective>) => {
      this.adjectivesService.setData(adjectives.filter((adjective) => adjective?.show !== '-'));
      this.checkData(this.adjectivesService.data);
    });
  }

  ngOnDestroy(): void {
    this.excelSubscription.unsubscribe();
  }

  public onReload(): void {
    this.adjectivesService.initAdjectivesVariables();
    this.messageService.add({
      severity: 'warn',
      summary: `${this.adjectivesService.name.charAt(0).toUpperCase()}${this.adjectivesService.name.slice(1)} éffacés.`
    });
  }

  private checkData(adjectives: Array<Adjective>): void {
    if (adjectives.length < 2) {
      this.adjectivesService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const keys = Object.keys(adjectives[0]);
    keys.forEach((key) => {
      if (!this.adjectivesService.validKeys.includes(key)) {
        this.adjectivesService.setIsValidData(false);
      }
    });
    const message = (this.adjectivesService.isValidData) ?
      { severity: 'info', summary: Text.validAdjectivesText, detail: Text.selectPriorityText }
      : { severity: 'error', summary: Text.invalidText, detail: Text.removeText };
    this.messageService.add(message);
  }

  public onChangePriority(priority: string): void {
    this.adjectivesService.setCounter(0);
    this.adjectivesService.setFirstNext(true);
    if (priority === '0') {
      this.adjectivesService.setPriority(undefined);
      this.adjectivesService.setCurrentItem(undefined);
    } else {
      this.adjectivesService.setPriority(+priority);
      this.selectAdjectives();
      this.adjectivesService.setIndex({
        previous: undefined,
        current: this.adjectivesService.index.current,
        next: undefined
      });
    }
  }

  public onNext(): void {
    if (this.adjectivesService.selectedData.length > 1) {
      this.adjectivesService.setFirstNext(!this.adjectivesService.firstNext)
      if (!this.adjectivesService.firstNext) {
        const index: Index = {
          previous: this.adjectivesService.index.current,
          current: undefined,
          next: undefined
        };
        if (this.adjectivesService.index.next !== undefined) {
          index.current = this.adjectivesService.index.next;
        } else {
          index.current = this.globalService.getNext(this.adjectivesService.selectedData.length);
        }
        this.adjectivesService.setIndex(index);
        this.selectCurrentItem();
      } else {
        this.adjectivesService.setCounter(this.adjectivesService.counter + 1);
      }
    }
  }

  public onPrevious(): void {
    if (this.adjectivesService.index.previous !== undefined) {
      if (this.adjectivesService.firstNext) {
        this.adjectivesService.setCounter(this.adjectivesService.counter - 1);
      } else {
        this.adjectivesService.setFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.adjectivesService.index.previous,
        next: this.adjectivesService.index.current
      };
      this.adjectivesService.setIndex(index);
      this.selectCurrentItem();
    }
  }

  private selectAdjectives(): void {
    if (this.adjectivesService.priority !== undefined) {
      this.adjectivesService.setCurrentItem(undefined);
      const priority = +this.adjectivesService.priority;
      const selectedData = this.adjectivesService.data.filter((adjective) =>
        +adjective.priority === priority
      );
      this.adjectivesService.setSelectedData(selectedData);
      this.onNext();
    }
  }

  private selectCurrentItem(): void {
    const currentIndex = this.adjectivesService.index.current;
    if (currentIndex !== undefined) {
      this.adjectivesService.setCurrentItem(this.adjectivesService.selectedData[currentIndex]);
    }
  }

}
