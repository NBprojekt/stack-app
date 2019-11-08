import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IQuestionPreview } from 'src/app/interfaces/question-preview';
import { IQuestionFilter } from 'src/app/interfaces/question-filter';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly url = environment.api.url + environment.api.version;

  constructor(
    private http: HttpClient,
  ) { }

  public getQuestions(filter?: IQuestionFilter): Observable<Array<IQuestionPreview>> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('site', filter && filter.site || 'stackoverflow')
      .set('order', filter && filter.order || 'desc')
      .set('sort', filter && filter.sort || 'activity');

    return this.http.get<Array<IQuestionPreview>>(`${this.url}questions${filter && filter.featured ? '/featured' : '/'}`, {headers, params});
  }
}
