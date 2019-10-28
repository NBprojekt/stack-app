import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import { MoreComponent } from './more/more.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
  ) {}

  ngOnInit() {}

  public async showMore(ev: any) {
    const popover = await this.popoverController.create({
      component: MoreComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
