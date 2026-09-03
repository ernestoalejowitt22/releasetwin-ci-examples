import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>angular-demo</h1>
    <a data-testid="open-42" routerLink="/detail/42">Open order 42</a>
  `,
})
export class HomeComponent {}
