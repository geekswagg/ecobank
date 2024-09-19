import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MembersService } from '../service/members.service';
import { loadMembersSuccess, addMember, updateMember, deleteMember } from '../actions/posts.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private membersService: MembersService) {}

  // Effect to load posts
  loadMembers$ = createEffect(() => this.actions$.pipe(
    ofType('[Members] Load Members'),
    mergeMap(() => this.membersService.getMembers().pipe(
      map(members => loadMembersSuccess({ members }))
    ))
  ));

  // Effect to add a post
  addMember$ = createEffect(() => this.actions$.pipe(
    ofType(addMember),
    mergeMap(({ member }) => this.membersService.addMember(member).pipe(
      map(() => ({ type: '[Members] Add Members Success' }))
    ))
  ), { dispatch: false });

  // Effect to update a post
  updateMember$ = createEffect(() => this.actions$.pipe(
    ofType(updateMember),
    mergeMap(({ member }) => this.membersService.updateMember(member).pipe(
      map(() => ({ type: '[Members] Update Member Success' }))
    ))
  ), { dispatch: false });

  // Effect to delete a post
  deleteMember$ = createEffect(() => this.actions$.pipe(
    ofType(deleteMember),
    mergeMap(({ custNumber }) => this.membersService.deleteMember(custNumber).pipe(
      map(() => ({ type: '[Members] Delete Member Success' }))
    ))
  ), { dispatch: false });
}
