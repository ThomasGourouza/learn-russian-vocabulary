import { Component, OnInit } from '@angular/core';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor(
    public verbsService: VerbsService
  ) {}

  ngOnInit(): void {
  }

}
