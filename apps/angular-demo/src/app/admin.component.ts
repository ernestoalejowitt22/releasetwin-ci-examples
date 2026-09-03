import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="isAdmin; else denied" data-testid="admin">Admin area</div>
    <ng-template #denied><div data-testid="denied">Denied</div></ng-template>
  `,
})
export class AdminComponent {
  isAdmin = readCookie('demo_role') === 'admin';
}
