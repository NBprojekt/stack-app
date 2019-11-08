import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IQuestion } from 'src/app/interfaces/question';
import { IQuestionFilter } from 'src/app/interfaces/question-filter';
import { IResponse } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly url = environment.api.url + environment.api.version;

  constructor(
    private http: HttpClient,
  ) { }

  public getQuestions(filter?: IQuestionFilter): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('site', filter && filter.site || 'stackoverflow')
      .set('order', filter && filter.order || 'desc')
      .set('sort', filter && filter.sort || 'activity');

    return this.http.get<IResponse>(`${this.url}questions${filter && filter.featured ? '/featured' : '/'}`, {headers, params});
  }

  public getQuestion(id: number, site?: string): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('site', site || 'stackoverflow')
      .set('filter', 'withbody');

    return this.http.get<IResponse>(`${this.url}questions/${id}`, {headers, params});
  }
}
