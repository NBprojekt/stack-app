import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { QuestionOptionsComponent } from '../question-options/question-options.component';

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
  ) { }

  ngOnInit() {}

  public async shareQuestion(): Promise<void> {
    return null;
  }

  public async showQuestionOptions(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: QuestionOptionsComponent,
      translucent: true,
      event,
    });
    return await popover.present();
  }
}
