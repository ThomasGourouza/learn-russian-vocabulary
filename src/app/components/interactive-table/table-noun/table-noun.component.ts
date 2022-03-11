import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-noun',
  templateUrl: './table-noun.component.html'
})
export class TableNounComponent {

  @Input() public data!: Array<any>;
  @Input() public currentItem: any | undefined;
  @Input() public firstNext!: boolean;

  public print(gender: string): string {
    switch (gender) {
      case 'M':
        return 'Masculin';
      case 'F':
        return 'Féminin';
      case 'N':
        return 'Neutre';
      case 'P':
        return 'Pluriel';
      default:
        return '?';
    }
  }

}
