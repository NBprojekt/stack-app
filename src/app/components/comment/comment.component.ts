import { Component, Input } from '@angular/core';

import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'comments',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent  {
  @Input() comments: Array<IComment>;
  @Input() questionOwner: IUser;
  @Input() highlight: number;
  @Input() type: string;
}
