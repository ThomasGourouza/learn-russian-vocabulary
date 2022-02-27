import { Component, OnInit } from '@angular/core';
import { Noun } from 'src/app/models/noun';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html',
  styleUrls: ['./noun.component.scss']
})
export class NounComponent implements OnInit {

  public nouns: Array<Noun>;

  constructor(
    private dataService: DataService
  ) {
    this.nouns = [];
  }

  ngOnInit(): void {
    this.dataService.nouns$.subscribe((nouns) => {
      this.nouns = nouns;
      console.log(this.nouns);
    });
  }

}
