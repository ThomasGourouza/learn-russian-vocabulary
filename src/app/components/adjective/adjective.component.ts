import { Component, OnInit } from '@angular/core';
import { Adjective } from 'src/app/models/adjective';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adjective',
  templateUrl: './adjective.component.html',
  styleUrls: ['./adjective.component.scss']
})
export class AdjectiveComponent implements OnInit {

  public adjectives: Array<Adjective>;

  constructor(
    private dataService: DataService
  ) {
    this.adjectives = [];
  }

  ngOnInit(): void {
    this.dataService.adjectives$.subscribe((adjectives) => {
      this.adjectives = adjectives;
      console.log(this.adjectives);
    });
  }

}
