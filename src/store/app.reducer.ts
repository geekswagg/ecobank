import { ActionReducerMap } from '@ngrx/store';
import { jointMembersReducer, MembersState } from './reducers/jointMembers.reducer';

// Define the global state interface
export interface AppState {
  jointMembers: MembersState;
}

// Combine all feature reducers into the rootReducer
export const rootReducer: ActionReducerMap<AppState> = {
  jointMembers: jointMembersReducer
};
