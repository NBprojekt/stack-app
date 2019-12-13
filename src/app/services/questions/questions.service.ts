import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { IQuestion } from 'src/app/interfaces/question';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { IResponse, IResponseError } from 'src/app/interfaces/response';

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

  // Getter
  public getQuestions(options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('page', options && options.page ? options.page.toString() : '1')
      .set('pagesize', this.pagesize.toString())
      .set('site', options && options.site || 'stackoverflow')
      .set('order', options && options.order || 'desc')
      .set('filter', options && options.filter || '!-.3J6_-dxUCh')
      .set('sort', options && options.sort || 'activity');

    return this.http.get<IResponse>(`${this.url}questions${options && options.featured ? '/featured' : '/'}`, {headers, params});
  }
  public getQuestion(id: number | Array<number>, options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('site', options && options.site || 'stackoverflow')
      .set('filter', options && options.filter || '!LVBj2-meM(Hb3X0793bKrF');

    if (Array.isArray(id)) {
      let ids = '';
      id.forEach((value) => ids += `${value};`);
      return this.http.get<IResponse>(`${this.url}questions/${ids}`, {headers, params});
    }

    return this.http.get<IResponse>(`${this.url}questions/${id}`, {headers, params});
  }
  public getAnswers(id: number | Array<number>, options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('site', options && options.site || 'stackoverflow')
      .set('order', options && options.order || 'desc')
      .set('sort', options && options.sort || 'votes')
      .set('filter', options && options.filter || '!)rFTNOmY7xxwmJcETs5e');

    if (Array.isArray(id)) {
      let ids = '';
      id.forEach((value) => ids += `${value};`);
      return this.http.get<IResponse>(`${this.url}questions/${ids}/answers`, {headers, params});
    }

    return this.http.get<IResponse>(`${this.url}questions/${id}/answers`, {headers, params});
  }

  // Voting
  public upvoteQuestion(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
    .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || 'stackoverflow',
      preview: !environment.production,
      filter: options && options.filter || '!LVBj2-meM(Hb3X0793bKrF',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}questions/${id}/upvote`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public upvoteQuestionUndo(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || 'stackoverflow',
      preview: !environment.production,
      filter: options && options.filter || '!LVBj2-meM(Hb3X0793bKrF',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}questions/${id}/upvote/undo`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public downvoteQuestion(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || 'stackoverflow',
      preview: !environment.production,
      filter: options && options.filter || '!LVBj2-meM(Hb3X0793bKrF',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}questions/${id}/downvote`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public downvoteQuestionUndo(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || 'stackoverflow',
      preview: !environment.production,
      filter: options && options.filter || '!LVBj2-meM(Hb3X0793bKrF',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}questions/${id}/downvote/undo`,
      this.bodyToFormBody(body),
      { headers }
    );
  }

  // Vavorites
  public favoriteQuestion(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || 'stackoverflow',
      preview: !environment.production,
      filter: options && options.filter || '!LVBj2-meM(Hb3X0793bKrF',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}questions/${id}/favorite`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public favoriteQuestionUndo(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || 'stackoverflow',
      preview: !environment.production,
      filter: options && options.filter || '!LVBj2-meM(Hb3X0793bKrF',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}questions/${id}/favorite/undo`,
      this.bodyToFormBody(body),
      { headers }
    );
  }

  // Helper
  public questionIsHot(question: IQuestion): boolean {
    if (!question.answers) { return false; }

    const summAnswerScore = question.answers
      .map(answer => answer.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue);

    return (((Math.log(question.view_count) * 4) + ((question.answer_count * question.score) / 5) + summAnswerScore) /
            Math.pow(((this.unixTimestampToHours(question.creation_date) + 1) -
                     ((this.unixTimestampToHours(question.creation_date) - this.unixTimestampToHours(question.last_activity_date))
                     / 2))
                    , 1.5)
            ) > 0;
  }
  private bodyToFormBody(obj: any): string {
    const formBody = [];
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(obj[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
    }
    return formBody.join('&');
  }
  private unixTimestampToHours(unixTimestamp: number): number {
    const start = moment.unix(unixTimestamp);
    const end = moment();
    const duration = moment.duration(end.diff(start));
    return duration.asHours();
  }
}
