import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-verb',
  templateUrl: './table-verb.component.html'
})
export class TableVerbComponent {

  @Input() public data!: Array<any>;
  @Input() public currentData: any | undefined;
  @Input() public firstNext!: boolean;

}
