import { Component, OnInit } from '@angular/core';
import { Conjunction } from 'src/app/models/conjunction';

@Component({
  selector: 'app-conjunction',
  templateUrl: './conjunction.component.html',
  styleUrls: ['./conjunction.component.scss']
})
export class ConjunctionComponent implements OnInit {

  public conjunctions: Array<Conjunction>;

  constructor(
  ) {
    this.conjunctions = [];
  }

  ngOnInit(): void {
  }

}
