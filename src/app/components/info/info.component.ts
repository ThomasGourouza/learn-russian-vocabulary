import { Component } from '@angular/core';
import { VerbsService } from 'src/app/services/verbs.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  constructor(
    public verbsService: VerbsService
  ) {}

}
