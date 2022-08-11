import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ReaderSpeakerService {

  private readonly apiKey: string;
  private readonly baseUrl: string;
  
  constructor(
    private readonly http: HttpClient
  ) {
    this.apiKey = '1a6607fa46809c9416cdbf1a85c7136f';
    this.baseUrl = 'https://scapi-eu.readspeaker.com/a/speak';
  }

  getVoice(text: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {
      params: { 
        key: this.apiKey,
        lang: 'da_dk',
        voice: 'Lene',
        volume: '200',
        text,
      },
    }).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => 
        of(error.url)
      )
    );
  }

}
