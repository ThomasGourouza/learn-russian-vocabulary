import { Routes } from "@angular/router";
import { AdjectiveComponent } from "./components/adjective/adjective.component";
import { ConjunctionComponent } from "./components/conjunction/conjunction.component";
import { NounComponent } from "./components/noun/noun.component";
import { PhraseComponent } from "./components/phrase/phrase.component";
import { VerbComponent } from "./components/verb/verb.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'nouns', component: NounComponent },
    { path: 'adjectives', component: AdjectiveComponent },
    { path: 'conjunctions', component: ConjunctionComponent },
    { path: 'phrases', component: PhraseComponent },
    { path: 'verbs', component: VerbComponent },
    { path: '**', redirectTo: '/welcome' },
];
