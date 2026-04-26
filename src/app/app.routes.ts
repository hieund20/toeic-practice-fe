import { Routes } from '@angular/router';
import { TestDetailComponent } from './features/test/test-detail/test-detail.component';
import { TestListComponent } from './features/test/test-list/test-list.component';
import { ResultComponent } from './features/result/result/result.component';
import { ReviewComponent } from './features/review/review/review.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tests', pathMatch: 'full' },

  // list all tests
  { path: 'tests', component: TestListComponent },

  // do a test
  { path: 'tests/:id', component: TestDetailComponent },

  // result screen
  { path: 'result', component: ResultComponent },
  { path: 'review/:id', component: ReviewComponent },
];
