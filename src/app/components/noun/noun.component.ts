import { Component, OnInit } from '@angular/core';
import { Noun } from 'src/app/models/noun';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html',
  styleUrls: ['./noun.component.scss']
})
export class NounComponent implements OnInit {

  public nouns: Array<Noun>;

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.setTabIndex(2);
    this.nouns = [];
  }

  ngOnInit(): void {
  }

}
