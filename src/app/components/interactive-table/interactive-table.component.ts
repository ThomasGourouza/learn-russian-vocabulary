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
  @Input() set currentItem(item: any) {
    this.isLoaded = false;
    this.item = item;
    this.canReadSpeak = false;
    if (!!item) {
      this.loadAudioUrl(item.russian);
    }
  }
  @Input() public priority: number | undefined;
  @Input() public time: number | undefined;
  @Input() public isValidData!: boolean;
  @Input() public firstNext!: boolean;
  @Input() public index!: Index;
  @Output() reload: EventEmitter<undefined> = new EventEmitter();
  @Output() changePriority: EventEmitter<string> = new EventEmitter();
  @Output() previous: EventEmitter<undefined> = new EventEmitter();
  @Output() next: EventEmitter<undefined> = new EventEmitter();
  public item: any | undefined;
  public priorities: Array<number> = [];
  public times: Array<number>;
  private subscription = new Subscription();
  public isPlaying = false;
  public audioUrl: undefined | string;
  public openReadSpeaker = false;
  public canReadSpeak = false;
  public isPrevious = false;
  public isLoaded = false;

  constructor(
    private excelService: ExcelService,
    private readerSpeakerService: ReaderSpeakerService
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
    setTimeout(() => {
      if (this.canReadSpeak) {
        this.onReadSpeak();
      }
    }, 100);
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

  private loadAudioUrl(word: string): void {
    this.readerSpeakerService.getVoice(word).subscribe((audioFileUrl) => {
      this.isLoaded = true;
      this.audioUrl = audioFileUrl;
      if (this.isPrevious) {
        this.onReadSpeak();
      }
    });
  }

  public onReadSpeak(): void {
    this.openReadSpeaker = false;
    setTimeout(() => {
      this.openReadSpeaker = true;
    }, 100);
  }

}
