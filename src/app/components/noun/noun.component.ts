import { Component, OnInit } from '@angular/core';
import { Noun } from 'src/app/models/noun';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html',
  styleUrls: ['./noun.component.scss']
})
export class NounComponent implements OnInit {

  public nouns: Array<Noun>;

  constructor(
  ) {
    this.nouns = [];
  }

  ngOnInit(): void {
  }

}
