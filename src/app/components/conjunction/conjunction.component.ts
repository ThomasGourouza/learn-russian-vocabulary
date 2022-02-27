import { Component, OnInit } from '@angular/core';
import { Conjunction } from 'src/app/models/conjunction';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-conjunction',
  templateUrl: './conjunction.component.html',
  styleUrls: ['./conjunction.component.scss']
})
export class ConjunctionComponent implements OnInit {

  public conjunctions: Array<Conjunction>;

  constructor(
    private dataService: DataService
  ) {
    this.conjunctions = [];
  }

  ngOnInit(): void {
    this.dataService.conjunctions$.subscribe((conjunctions) => {
      this.conjunctions = conjunctions;
      console.log(this.conjunctions);
    });
  }

}
