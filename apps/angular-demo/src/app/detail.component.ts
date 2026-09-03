import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  template: `
    <h1>Order detail</h1>
    <div data-testid="detail-id">{{ id }}</div>
  `,
})
export class DetailComponent {
  id: string | null;

  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');
  }
}
