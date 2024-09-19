import { createReducer, on } from '@ngrx/store';
import { loadMembersSuccess, addMember, updateMember, deleteMember } from '../actions/posts.actions';
import { AccountMember } from 'src/app/_models/data-models';

// Define the structure of the Post and PostsState

export interface MembersState {
  members: AccountMember[]; // Array of posts
  loading: boolean; // Tracks if posts are being loaded
}

// Define the initial state for posts
export const initialMembersState:MembersState = {
  members: [],
  loading: false
};

// Create the reducer to handle posts-related actions
export const jointMembersReducer = createReducer(
  initialMembersState,

  // Handle successful loading of posts
  on(loadMembersSuccess, (state, { members }) => ({
    ...state,
    members: [...members],
    loading: false
  })),

  // Handle adding a new post
  on(addMember, (state, { member }) => ({
    ...state,
    members: [...state.members, member]
  })),

  // Handle updating a post
  on(updateMember, (state, { member }) => ({
    ...state,
    members: state.members.map(p => (p.custNumber === member.custNumber ? { ...p, ...member } : p))
  })),

  // Handle deleting a post
  on(deleteMember, (state, { custNumber }) => ({
    ...state,
    members: state.members.filter(p => p.custNumber !== custNumber)
  }))
);
