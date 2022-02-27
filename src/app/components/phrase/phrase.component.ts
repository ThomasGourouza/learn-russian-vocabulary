import { Component, OnInit } from '@angular/core';
import { Phrase } from 'src/app/models/phrase';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {

  public phrases: Array<Phrase>;

  constructor(
    private dataService: DataService
  ) {
    this.phrases = [];
  }

  ngOnInit(): void {
    this.dataService.phrases$.subscribe((phrases) => {
      this.phrases = phrases;
      console.log(this.phrases);
    });
  }

}
