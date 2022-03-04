import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { NounsService } from 'src/app/services/nouns.service';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {

  public tabIndex: number;

  constructor(
    public navigationService: NavigationService,
    public verbsService: VerbsService,
    public nounsService: NounsService
  ) {
    this.tabIndex = 0;
  }

  ngOnInit(): void {
    this.navigationService.tabIndex$.subscribe((tabIndex) => this.tabIndex = tabIndex);
  }

}
