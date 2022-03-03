import { Component } from '@angular/core';
import { NounsService } from 'src/app/services/nouns.service';
@Component({
  selector: 'app-info-nouns',
  templateUrl: './info-nouns.component.html'
})
export class InfoNounsComponent {

  constructor(
    public nounsService: NounsService
  ) { }

}
