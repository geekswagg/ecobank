import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountMember } from 'src/app/_models/data-models';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private members: AccountMember[] = [];

  // Simulate getting posts from an API
  getMembers(): Observable<AccountMember[]> {
    return of(this.members);
  }

  // Simulate adding a new post
  addMember(member: AccountMember): Observable<void> {
    this.members.push(member);
    return of();
  }

  // Simulate updating a post
  updateMember(member: AccountMember): Observable<void> {
    this.members = this.members.map(p => (p.custNumber === member.custNumber ? member : p));
    return of();
  }

  // Simulate deleting a post
  deleteMember(custNumber: string): Observable<void> {
    this.members = this.members.filter(p => p.custNumber !== custNumber);
    return of();
  }
}
