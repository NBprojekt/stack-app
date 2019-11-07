import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IQuestionPreview } from 'src/app/interfaces/question-preview';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly url = environment.api.url + environment.api.version;

  constructor(
    private http: HttpClient,
  ) { }

  public getQuestions(site?: string, order?: string, sort?: string): Observable<Array<IQuestionPreview>> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('site', site || 'stackoverflow')
      .set('order', order || 'desc')
      .set('sort', sort || 'activity');

    return this.http.get<Array<IQuestionPreview>>(`${this.url}questions`, {headers, params});
  }
}
