import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  public tabItems: MenuItem[];
  public tabIndex: number;

  constructor(
    private navigationService: NavigationService
  ) {
    this.tabIndex = 0;
    this.tabItems = [
      { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: '/welcome' },
      { label: 'Noms', icon: 'pi pi-fw pi-book', routerLink: '/nouns' },
      { label: 'Verbes', icon: 'pi pi-fw pi-book', routerLink: '/verbs' },
      { label: 'Adverbes', icon: 'pi pi-fw pi-book', routerLink: '/adverbs' },
      { label: 'Adjectifs', icon: 'pi pi-fw pi-book', routerLink: '/adjectives' },
      { label: 'Conjonctions', icon: 'pi pi-fw pi-book', routerLink: '/conjunctions' },
      { label: 'Expressions', icon: 'pi pi-fw pi-book', routerLink: '/phrases' }
    ];
  }

  ngOnInit(): void {
    this.navigationService.tabIndex$.subscribe((tabIndex) => this.tabIndex = tabIndex);
  }

}
