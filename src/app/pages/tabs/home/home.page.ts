import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { IQuestionPreview } from 'src/app/interfaces/question-preview';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public backdrop = false;
  public questions: Array<IQuestionPreview>;

  constructor(
    private questionsService: QuestionsService,
  ) { }

  ngOnInit() {
    this.doRefresh();
  }

  doRefresh(event?: any): void {
    this.questionsService.getQuestions().subscribe((questions: any) => {
      this.questions = questions.items as Array<IQuestionPreview>;
      console.log(this.questions)
      if (event) { event.target.complete(); }
    });
  }
}
