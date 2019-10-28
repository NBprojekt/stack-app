import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent {

  constructor(
    public modalController: ModalController
  ) {}

  close() {
    this.modalController.dismiss();
  }
}
