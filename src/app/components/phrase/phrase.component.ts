import { Component, OnInit } from '@angular/core';
import { Phrase } from 'src/app/models/phrase';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {

  public phrases: Array<Phrase>;

  constructor(
  ) {
    this.phrases = [];
  }

  ngOnInit(): void {
  }

}
