import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Verb } from 'src/app/models/verb';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit, OnDestroy {

  public verbs: Array<Verb>;
  public currentVerb: Verb | undefined;
  public intervalSub: Subscription;
  public isPaused: boolean;
  private currentIndex: number;

  constructor(
    private dataService: DataService
  ) {
    this.verbs = [];
    this.intervalSub = new Subscription();
    this.isPaused = false;
    this.currentIndex = 0;
  }

  ngOnInit(): void {
    this.dataService.verbs$.subscribe((verbs) => {
      this.verbs = verbs;
      this.currentVerb = this.verbs[this.currentIndex];
      this.run();
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private run(): void {
    this.intervalSub = interval(1000).subscribe((second) => {
      if (second % 5 === 0) {
        this.next();
      }
    });
  }

  private stop(): void {
    this.intervalSub.unsubscribe();
  }

  public pause(): void {
    this.isPaused ? this.run() : this.stop();
    this.isPaused = !this.isPaused;
  }

  public next(): void {
    this.currentIndex++;
    this.select();
  }

  public previous(): void {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.verbs.length - 1;
    this.select();
  }

  private select(): void {
    this.currentIndex = this.currentIndex % this.verbs.length;
    this.currentVerb = this.verbs[this.currentIndex];
  }

}
