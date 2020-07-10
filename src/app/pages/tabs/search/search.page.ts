import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IRequestOptions } from 'src/app/interfaces/request-options';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  public readonly maxItems = 20;
  public showItems: number;
  public searchString: string;

  public loading: boolean;

  public result: Array<IQuestion>;

  private options: IRequestOptions;

  constructor(
    private searchService: SearchService,
  ) {}

  public search(): void {
    const searchString = this.searchString ? this.searchString.toLowerCase().trim() : '';

    console.log(`Searching for ${searchString}`);

    if(!searchString) {
      this.result = null;
      return;
    }

    this.loading = true;

    this.searchService.searchAdvanced(searchString, this.options).subscribe(response => {
      this.result = response.items;
    });
  }


  public formatUrl(url: string): string {
    return url.replace(/[^\w\s]/gi, '').split(' ').join('-');
  }

  public resetFilter(): void {
    this.searchString = '';
    console.log(`Cleared Searchstring`);
  }
}
