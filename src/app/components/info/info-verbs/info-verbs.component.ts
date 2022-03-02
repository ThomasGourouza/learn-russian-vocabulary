import { Component } from '@angular/core';
import { VerbsService } from 'src/app/services/verbs.service';
@Component({
  selector: 'app-info-verbs',
  templateUrl: './info-verbs.component.html',
  styleUrls: ['./info-verbs.component.scss']
})
export class InfoVerbsComponent {

  constructor(
    public verbsService: VerbsService
  ) { }

}
