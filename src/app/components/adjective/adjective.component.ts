import { Component, OnInit } from '@angular/core';
import { Adjective } from 'src/app/models/adjective';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-adjective',
  templateUrl: './adjective.component.html'
})
export class AdjectiveComponent implements OnInit {

  public adjectives: Array<Adjective>;

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.setTabIndex(3);
    this.adjectives = [];
  }

  ngOnInit(): void {
  }

}
