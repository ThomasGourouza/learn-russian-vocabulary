import { Component } from '@angular/core';
import { Conjunction } from 'src/app/models/conjunction';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-conjunction',
  templateUrl: './conjunction.component.html'
})
export class ConjunctionComponent {

  public conjunctions: Array<Conjunction>;

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.setTabIndex(4);
    this.conjunctions = [];
  }

}
