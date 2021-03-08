import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-help',
  templateUrl: './search-help.component.html',
  styleUrls: ['./search-help.component.scss'],
})
export class SearchHelpComponent {

  constructor(
    private modalController: ModalController,
  ) { }

  public dismissModal(): void {
    this.modalController.dismiss();
  }
}
