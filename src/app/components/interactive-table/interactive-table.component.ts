import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Index } from 'src/app/models';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html'
})
export class InteractiveTableComponent {

  @Input() public name!: string;
  @Input() public data!: Array<any>;
  @Input() public currentItem: any;
  @Input() public priority: number | undefined;
  @Input() public time: number | undefined;
  @Input() public isValidData!: boolean;
  @Input() public firstNext!: boolean;
  @Input() public index!: Index;
  @Output() reload: EventEmitter<undefined> = new EventEmitter();
  @Output() changePriority: EventEmitter<string> = new EventEmitter();
  @Output() previous: EventEmitter<undefined> = new EventEmitter();
  @Output() next: EventEmitter<undefined> = new EventEmitter();
  public priorities: Array<number> = [];
  public times: Array<number>;
  private subscription = new Subscription();
  public isPlaying = false;
  public audioUrl: undefined | string;
  public openReadSpeaker = false;
  public canReadSpeak = false;
  public isPrevious = false;

  constructor(
    private excelService: ExcelService
  ) {
    this.times = [3000, 5000, 10000];
    this.time = 3000;
    this.priorities = this.excelService.priorities;
    this.excelService.priorities$.subscribe((priorities) =>
      this.priorities = priorities
    );
  }

  public onUploadData(file: File): void {
    this.excelService.excelToJSON(this.name, file);
  }
  public onReload(): void {
    this.reload.emit();
  }
  public onChangePriority(priority: string): void {
    this.changePriority.emit(priority);
  }
  public onChangeTime(): void {
    if (this.isPlaying) {
      this.subscription.unsubscribe();
      this.onPlay();
    }
  }
  public onPrevious(): void {
    this.isPrevious = true;
    this.previous.emit();
  }
  public onNext(): void {
    this.canReadSpeak = true;
    this.isPrevious = false;
    this.next.emit();
  }
  public onPlay(): void {
    this.isPlaying = true;
    this.subscription = interval(this.time).subscribe(() =>
      this.onNext()
    );
  }
  public onStop(): void {
    this.isPlaying = false;
    this.subscription.unsubscribe();
  }

}
