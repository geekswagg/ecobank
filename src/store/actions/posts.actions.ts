import { createAction, props } from '@ngrx/store';
import { AccountMember } from 'src/app/_models/data-models';

// Action for successfully loading posts
export const loadMembersSuccess = createAction(
  '[Members] Load Members Success',
  props<{ members: AccountMember[] }>()
);

// Action to add a new post
export const addMember = createAction(
  '[Members] Add Member',
  props<{ member: AccountMember }>()
);

// Action to update an existing post
export const updateMember = createAction(
  '[Members] Update Member',
  props<{ member: AccountMember }>()
);

// Action to delete a post
export const deleteMember = createAction(
  '[Members] Delete member',
  props<{ custNumber: string }>()
);
