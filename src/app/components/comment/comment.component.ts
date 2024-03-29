import { Component, Input } from '@angular/core';

import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

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

  constructor (
    private router: Router,
  ) {}

  public openProfile(id): void {
    this.router.navigateByUrl(`/menu/user/${id}`);
  }
}
