import { Component, OnDestroy, OnInit } from '@angular/core';
import { Verb } from 'src/app/models/verb';
import { VerbsService } from 'src/app/services/verbs.service';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Index } from 'src/app/models';
import { MessageService } from 'primeng/api';
import { Text } from 'src/app/models/text';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html'
})
export class VerbComponent implements OnInit, OnDestroy {

  private excelSubscription = new Subscription();

  constructor(
    private excelService: ExcelService,
    private navigationService: NavigationService,
    public verbsService: VerbsService,
    private messageService: MessageService,
    private globalService: GlobalService
  ) {
    this.navigationService.setTabIndex(this.verbsService.tabIndex);
  }

  ngOnInit(): void {
    this.excelSubscription = this.excelService.uploadedVerbs$.subscribe((verbs: Array<Verb>) => {
      this.verbsService.setData(verbs.filter((verb) => verb?.show !== '-'));
      this.checkData(this.verbsService.data);
    });
  }

  ngOnDestroy(): void {
    this.excelSubscription.unsubscribe();
  }

  public onReload(): void {
    this.verbsService.initVerbsVariables();
    this.messageService.add({
      severity: 'warn',
      summary: `${this.verbsService.name.charAt(0).toUpperCase()}${this.verbsService.name.slice(1)} éffacés.`
    });
  }

  private checkData(verbs: Array<Verb>): void {
    if (verbs.length < 2) {
      this.verbsService.setIsValidData(false);
      this.messageService.add({ severity: 'error', summary: Text.notEnoughText, detail: Text.addMoreDataText });
      return;
    }
    const keys = Object.keys(verbs[0]);
    keys.forEach((key) => {
      if (!this.verbsService.validKeys.includes(key)) {
        this.verbsService.setIsValidData(false);
      }
    });
    const message = (this.verbsService.isValidData) ?
      { severity: 'info', summary: Text.validVerbsText, detail: Text.selectPriorityText }
      : { severity: 'error', summary: Text.invalidText, detail: Text.removeText };
    this.messageService.add(message);
  }

  public onChangePriority(priority: string): void {
    this.verbsService.setCounter(0);
    this.verbsService.setFirstNext(true);
    if (priority === '0') {
      this.verbsService.setPriority(undefined);
      this.verbsService.setCurrentItem(undefined);
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

  public onNext(): void {
    if (this.verbsService.selectedData.length > 1) {
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
          index.current = this.globalService.getNext(this.verbsService.selectedData.length);
        }
        this.verbsService.setIndex(index);
        this.selectCurrentItem();
      } else {
        this.verbsService.setCounter(this.verbsService.counter + 1);
      }
    }
  }

  public onPrevious(): void {
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
      this.selectCurrentItem();
    }
  }

  private selectVerbs(): void {
    if (this.verbsService.priority !== undefined) {
      this.verbsService.setCurrentItem(undefined);
      const priority = +this.verbsService.priority;
      const selectedData = this.verbsService.data.filter((verb) =>
        +verb.priority === priority
      );
      this.verbsService.setSelectedData(selectedData);
      this.onNext();
    }
  }

  private selectCurrentItem(): void {
    const currentIndex = this.verbsService.index.current;
    if (currentIndex !== undefined) {
      this.verbsService.setCurrentItem(this.verbsService.selectedData[currentIndex]);
    }
  }

}
