import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IQuestion } from 'src/app/interfaces/question';
import { IQuestionOptions } from 'src/app/interfaces/question-options';
import { IResponse } from 'src/app/interfaces/response';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly url = environment.api.url + environment.api.version;
  private readonly pagesize = 20;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  public getQuestions(options?: IQuestionOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', this.authService.getToken())
      .set('page', options.page ? options.page.toString() : '1')
      .set('pagesize', this.pagesize.toString())
      .set('site', options && options.site || 'stackoverflow')
      .set('order', options && options.order || 'desc')
      .set('filter', options && options.filter || '!-.3J6_-dxUCh')
      .set('sort', options && options.sort || 'activity');

    return this.http.get<IResponse>(`${this.url}questions${options && options.featured ? '/featured' : '/'}`, {headers, params});
  }

  public getQuestion(id: number | Array<number>, options?: IQuestionOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', this.authService.getToken())
      .set('site', options && options.site || 'stackoverflow')
      .set('filter', options && options.filter || '!b1MMEAHFHSxpMa');

    if (Array.isArray(id)) {
      let ids = '';
      id.forEach((value) => ids += `${value};`);
      return this.http.get<IResponse>(`${this.url}questions/${ids}`, {headers, params});
    }

    return this.http.get<IResponse>(`${this.url}questions/${id}`, {headers, params});
  }

  public getAnswers(id: number | Array<number>, options?: IQuestionOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', this.authService.getToken())
      .set('site', options && options.site || 'stackoverflow')
      .set('order', options && options.order || 'desc')
      .set('sort', options && options.sort || 'votes')
      .set('filter', options && options.filter || 'withbody');

    if (Array.isArray(id)) {
      let ids = '';
      id.forEach((value) => ids += `${value};`);
      return this.http.get<IResponse>(`${this.url}questions/${ids}/answers`, {headers, params});
    }

    return this.http.get<IResponse>(`${this.url}questions/${id}/answers`, {headers, params});
  }
}
