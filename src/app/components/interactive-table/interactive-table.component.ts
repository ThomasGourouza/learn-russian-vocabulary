import { Component, Input, OnInit } from '@angular/core';
import { Index } from 'src/app/models';
import { Noun } from 'src/app/models/noun';
import { Verb } from 'src/app/models/verb';
export type Data = Verb | Noun;
@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html'
})
export class InteractiveTableComponent implements OnInit {

  @Input() public data!: Array<Data>;
  @Input() public priority: number | undefined;
  @Input() public isValidData!: boolean;
  @Input() public currentData: Data | undefined;
  @Input() public firstNext!: boolean;
  @Input() public index!: Index;

  constructor() { }

  ngOnInit(): void {
  }

  public onReload(): void {
    console.log('test');
  }
  public onUploadWords(event: any): void {
    console.log('test');
  }
  public changePriority(event: any): void {
    console.log('test');
  }
  public previous(): void {
    console.log('test');
  }
  public next(): void {
    console.log('test');
  }
  public print(event: string): string {
    return event;
  }

}
