import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-conjunction',
  templateUrl: './table-conjunction.component.html'
})
export class TableConjunctionComponent {

  @Input() public data!: Array<any>;
  @Input() public currentItem: any | undefined;
  @Input() public firstNext!: boolean;

}
