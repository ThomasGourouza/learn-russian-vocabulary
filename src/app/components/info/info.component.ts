import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { VerbsService } from 'src/app/services/verbs.service';
import { NounsService } from 'src/app/services/nouns.service';
import { AdjectivesService } from 'src/app/services/adjectives.service';
import { ConjunctionsService } from 'src/app/services/conjunctions.service';
import { AdverbsService } from 'src/app/services/adverbs.service';
import { PhrasesService } from 'src/app/services/phrases.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {

  public tabIndex: number;

  constructor(
    public navigationService: NavigationService,
    public verbsService: VerbsService,
    public nounsService: NounsService,
    public adjectivesService: AdjectivesService,
    public conjunctionsService: ConjunctionsService,
    public adverbsService: AdverbsService,
    public phrasesService: PhrasesService
  ) {
    this.tabIndex = 0;
  }

  ngOnInit(): void {
    this.navigationService.tabIndex$.subscribe((tabIndex) => this.tabIndex = tabIndex);
  }

}
