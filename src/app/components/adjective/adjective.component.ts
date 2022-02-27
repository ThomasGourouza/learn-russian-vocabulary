import { Component, OnInit } from '@angular/core';
import { Adjective } from 'src/app/models/adjective';

@Component({
  selector: 'app-adjective',
  templateUrl: './adjective.component.html',
  styleUrls: ['./adjective.component.scss']
})
export class AdjectiveComponent implements OnInit {

  public adjectives: Array<Adjective>;

  constructor(
  ) {
    this.adjectives = [];
  }

  ngOnInit(): void {
  }

}
