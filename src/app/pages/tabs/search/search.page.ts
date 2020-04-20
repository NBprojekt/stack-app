import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  public readonly maxItems = 20;
  public showItems: number;
  public searchString: string;


  constructor() {}

  public search(): void {
    const searchString = this.searchString ? this.searchString.toLowerCase().trim() : '';

    console.log(`Searching for ${searchString}`);
  }

  public resetFilter(): void {
    this.searchString = '';
    console.log(`Cleared Searchstring`);
  }
}
