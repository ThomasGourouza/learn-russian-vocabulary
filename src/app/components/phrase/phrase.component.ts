import { Component, OnInit } from '@angular/core';
import { Phrase } from 'src/app/models/phrase';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {

  public phrases: Array<Phrase>;

  constructor(
    private navigationService: NavigationService
  ) {
    this.navigationService.setTabIndex(5);
    this.phrases = [];
  }

  ngOnInit(): void {
  }

}
