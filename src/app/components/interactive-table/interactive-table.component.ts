import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Index } from 'src/app/models';
import { ExcelService } from 'src/app/services/excel.service';
import { ReaderSpeakerService } from 'src/app/services/reader-speaker.service';
@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html'
})
export class InteractiveTableComponent {

  @Input() public name!: string;
  @Input() public data!: Array<any>;
  @Input() public currentItem: any | undefined;
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

  constructor(
    private excelService: ExcelService,
    private readerSpeakerService: ReaderSpeakerService
  ) {
    this.times = [1000, 2000, 3000, 5000, 10000];
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
    this.previous.emit();
  }
  public onNext(): void {
    this.next.emit();
    // this.onSpeak(this.currentItem?.russian);
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

  public onSpeak(word: string): void {
    this.readerSpeakerService.getVoice(word).subscribe((audioFileUrl) =>
      console.log(audioFileUrl)
    );
  }

}
