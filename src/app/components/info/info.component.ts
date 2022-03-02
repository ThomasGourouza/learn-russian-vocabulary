import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public tabIndex: number;

  constructor(
    public navigationService: NavigationService
  ) {
    this.tabIndex = 0;
  }

  ngOnInit(): void {
    this.navigationService.tabIndex$.subscribe((tabIndex) => this.tabIndex = tabIndex);
  }

}
