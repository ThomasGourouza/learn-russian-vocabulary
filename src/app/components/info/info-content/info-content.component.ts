import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-content',
  templateUrl: './info-content.component.html'
})
export class InfoContentComponent {

  @Input() public name!: { title: string; singular: string };
  @Input() public data!: Array<any>;
  @Input() public currentItem: any | undefined;
  @Input() public counter!: number;
  @Input() public priority: number | undefined;
  @Input() public isValidData!: boolean;

}
