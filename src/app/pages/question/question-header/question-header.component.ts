import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.scss'],
})
export class QuestionHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() link: string;

  constructor(
    private popoverController: PopoverController,
    private socialSharing: SocialSharing,
  ) { }

  ngOnInit() {}

  public async shareQuestion(): Promise<void> {
    const site = 'Stack Overflow';
    return this.socialSharing.shareWithOptions({
      message: this.title,
      subject: `Check out this ${site} question`,
      url: this.link,
    });
  }
}
