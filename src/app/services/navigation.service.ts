import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NavigationService {

    private _tabIndex$ = new Subject<number>();

    get tabIndex$(): Observable<number> {
        return this._tabIndex$.asObservable();
    }

    public setTabIndex(tabIndex: number): void {
        this._tabIndex$.next(tabIndex);
    }

}
