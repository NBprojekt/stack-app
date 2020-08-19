import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SearchService } from 'src/app/services/search/search.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { SearchHelpComponent } from './search-help/search-help.component';
import { IResponse } from 'src/app/interfaces/response';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public readonly maxItems = 20;
  public searchString: string;
  private _searchString: string;

  public loading: boolean;

  public result: Array<IQuestion>;
  public total: number;
  public hasMore: boolean;

  private options: IRequestOptions;

  constructor(
    private searchService: SearchService,
    private modalController: ModalController,
  ) {}

  public ngOnInit(): void {
    this.result = null;
    this.options = {};
    this.hasMore = false;
  }

  public search(): void {
    const searchString = this.searchString ? this.searchString.toLowerCase().trim() : '';

    if(!searchString || searchString.length === 0 || searchString === this._searchString) {
      return;
    }
    this._searchString = searchString;
    this.options = {page: 0, pagesize: 10};
    this.loading = true;

    this.searchService.searchAdvanced(searchString, this.options).subscribe((response: IResponse) => {
      this.result = response.items;
      this.total = response.total;
      this.hasMore = response.has_more;
      this.loading = false;
    });
  }

  public searchFor(s: string): void {
    this.searchString = s;
    this.search();
  }

  public resetFilter(): void {
    this.searchString = '';
    this.result = null;
    this.total = null;
  }

  public formatUrl(url: string): string {
    return url.replace(/[^\w\s]/gi, '').split(' ').join('-');
  }

  public async openSearchHelp(): Promise<void> {
    const modal = await this.modalController.create({
      component: SearchHelpComponent,
    });
    return await modal.present();
  }


  public loadMore(event?: any): void {
    this.options.page++;

    this.searchService.searchAdvanced(this._searchString, this.options).subscribe((response: IResponse) => {
      this.result = this.result.concat(response.items as Array<IQuestion>);
      this.hasMore = response.has_more;
      this.total = response.total;

      if (event) {
        event.target.complete();
      }
    });
  }
}
