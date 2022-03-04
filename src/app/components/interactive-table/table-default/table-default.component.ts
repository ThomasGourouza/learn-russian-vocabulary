import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-default',
  templateUrl: './table-default.component.html'
})
export class TableDefaultComponent {

  @Input() public data!: Array<any>;
  @Input() public currentItem: any | undefined;
  @Input() public firstNext!: boolean;

}
