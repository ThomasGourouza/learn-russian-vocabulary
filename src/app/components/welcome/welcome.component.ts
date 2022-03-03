import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {

  constructor(
    private navigationService: NavigationService,
    public verbsService: VerbsService
  ) {
    this.navigationService.setTabIndex(0);
  }

}
