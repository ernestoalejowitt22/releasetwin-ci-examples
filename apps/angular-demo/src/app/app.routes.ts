import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from './detail.component';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'admin', component: AdminComponent },
];
