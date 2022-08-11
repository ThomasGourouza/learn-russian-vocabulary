import { Component, OnDestroy, OnInit } from '@angular/core';
import { Conjunction } from 'src/app/models/conjunction';
import { ConjunctionsService } from 'src/app/services/conjunctions.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-conjunction',
  templateUrl: './conjunction.component.html'
})
export class ConjunctionComponent implements OnInit, OnDestroy {

  private excelSubscription = new Subscription();

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public conjunctionsService: ConjunctionsService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {
    this.navigationService.setTabIndex(this.conjunctionsService.tabIndex);
  }

  ngOnInit(): void {
    this.excelSubscription = this.excelService.uploadedConjunctions$.subscribe((conjunctions: Array<Conjunction>) => {
      this.conjunctionsService.setData(conjunctions.filter((conjunction) => conjunction?.show !== '-'));
      this.checkData(this.conjunctionsService.data);
    });
  }

  ngOnDestroy(): void {
    this.excelSubscription.unsubscribe();
  }

  public onReload(): void {
    this.conjunctionsService.initConjunctionsVariables();
    this.messageService.add({
      severity: 'warn',
      summary: `${this.conjunctionsService.name.charAt(0).toUpperCase()}${this.conjunctionsService.name.slice(1)} éffacés.`
    });
  }

  private checkData(conjunctions: Array<Conjunction>): void {
    if (conjunctions.length < 2) {
      this.conjunctionsService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const keys = Object.keys(conjunctions[0]);
    keys.forEach((key) => {
      if (!this.conjunctionsService.validKeys.includes(key)) {
        this.conjunctionsService.setIsValidData(false);
      }
    });
    const message = (this.conjunctionsService.isValidData) ?
      { severity: 'info', summary: Text.validConjunctionsText, detail: Text.selectPriorityText }
      : { severity: 'error', summary: Text.invalidText, detail: Text.removeText };
    this.messageService.add(message);
  }

  public onChangePriority(priority: string): void {
    this.conjunctionsService.setCounter(0);
    this.conjunctionsService.setFirstNext(true);
    if (priority === '0') {
      this.conjunctionsService.setPriority(undefined);
      this.conjunctionsService.setCurrentItem(undefined);
    } else {
      this.conjunctionsService.setPriority(+priority);
      this.selectConjunctions();
      this.conjunctionsService.setIndex({
        previous: undefined,
        current: this.conjunctionsService.index.current,
        next: undefined
      });
    }
  }

  public onNext(): void {
    if (this.conjunctionsService.selectedData.length > 1) {
      this.conjunctionsService.setFirstNext(!this.conjunctionsService.firstNext)
      if (!this.conjunctionsService.firstNext) {
        const index: Index = {
          previous: this.conjunctionsService.index.current,
          current: undefined,
          next: undefined
        };
        if (this.conjunctionsService.index.next !== undefined) {
          index.current = this.conjunctionsService.index.next;
        } else {
          index.current = this.globalService.getNext(this.conjunctionsService.selectedData.length);
        }
        this.conjunctionsService.setIndex(index);
        this.selectCurrentItem();
      } else {
        this.conjunctionsService.setCounter(this.conjunctionsService.counter + 1);
      }
    }
  }

  public onPrevious(): void {
    if (this.conjunctionsService.index.previous !== undefined) {
      if (this.conjunctionsService.firstNext) {
        this.conjunctionsService.setCounter(this.conjunctionsService.counter - 1);
      } else {
        this.conjunctionsService.setFirstNext(true);
      }
      const index: Index = {
        previous: undefined,
        current: this.conjunctionsService.index.previous,
        next: this.conjunctionsService.index.current
      };
      this.conjunctionsService.setIndex(index);
      this.selectCurrentItem();
    }
  }

  private selectConjunctions(): void {
    if (this.conjunctionsService.priority !== undefined) {
      this.conjunctionsService.setCurrentItem(undefined);
      const priority = +this.conjunctionsService.priority;
      const selectedData = this.conjunctionsService.data.filter((conjunction) =>
        +conjunction.priority === priority
      );
      this.conjunctionsService.setSelectedData(selectedData);
      this.onNext();
    }
  }

  private selectCurrentItem(): void {
    const currentIndex = this.conjunctionsService.index.current;
    if (currentIndex !== undefined) {
      this.conjunctionsService.setCurrentItem(this.conjunctionsService.selectedData[currentIndex]);
    }
  }

}
