import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Index } from 'src/app/models';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html'
})
export class InteractiveTableComponent {

  @Input() public name!: string;
  @Input() public data!: Array<any>;
  @Input() public currentData: any | undefined;
  @Input() public priority: number | undefined;
  @Input() public isValidData!: boolean;
  @Input() public firstNext!: boolean;
  @Input() public index!: Index;
  @Output() reload: EventEmitter<undefined> = new EventEmitter();
  @Output() changePriority: EventEmitter<string> = new EventEmitter();
  @Output() previous: EventEmitter<undefined> = new EventEmitter();
  @Output() next: EventEmitter<undefined> = new EventEmitter();

  constructor(
    private excelService: ExcelService
  ) { }

  public onReload(): void {
    this.reload.emit();
  }
  public onUploadWords(file: File): void {
    this.excelService.excelToJSON(this.name, file);
  }
  public onChangePriority(priority: string): void {
    this.changePriority.emit(priority);
  }
  public onPrevious(): void {
    this.previous.emit();
  }
  public onNext(): void {
    this.next.emit();
  }

}
