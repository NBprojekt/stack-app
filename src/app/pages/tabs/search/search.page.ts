import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SearchService } from 'src/app/services/search/search.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { SearchHelpComponent } from './search-help/search-help.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  public readonly maxItems = 20;
  public showItems: number;
  public searchString: string;
  private _searchString: string;

  public loading: boolean;

  public result: Array<IQuestion> = null;
  public total: number;

  private options: IRequestOptions;

  constructor(
    private searchService: SearchService,
    private modalController: ModalController,
  ) {}

  public search(): void {
    const searchString = this.searchString ? this.searchString.toLowerCase().trim() : '';

    if(!searchString || searchString.length === 0 || searchString === this._searchString) {
      return;
    }
    this._searchString = searchString;
    this.loading = true;

    this.searchService.searchAdvanced(searchString, this.options).subscribe(response => {
      this.result = response.items;
      this.total = response.total;
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
    console.log(`Cleared Searchstring`);
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
}
