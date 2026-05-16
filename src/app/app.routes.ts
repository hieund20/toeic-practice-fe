import { Routes } from '@angular/router';
import { TestDetailComponent } from './features/test/test-detail/test-detail.component';
import { TestListComponent } from './features/test/test-list/test-list.component';
import { ResultComponent } from './features/result/result/result.component';
import { ReviewComponent } from './features/review/review/review.component';
import { TestManagementComponent } from './features/admin/test-management/test-management.component';
import { TestFormComponent } from './features/admin/test-form/test-form.component';
import { TestDetailManagementComponent } from './features/admin/test-detail-management/test-detail-management.component';
import { QuestionManagementComponent } from './features/admin/question-management/question-management.component';
import { QuestionFormComponent } from './features/admin/question-form/question-form.component';
import { AnswerManagementComponent } from './features/admin/answer-management/answer-management.component';
import { AnswerFormComponent } from './features/admin/answer-form/answer-form.component';
import { TestPartFormComponent } from './features/admin/test-part-form/test-part-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tests', pathMatch: 'full' },

  // list all tests
  { path: 'tests', component: TestListComponent },

  // do a test
  { path: 'tests/:id', component: TestDetailComponent },

  // result screen
  { path: 'result', component: ResultComponent },
  { path: 'review/:id', component: ReviewComponent },

  // Admin
  { path: 'admin/tests', component: TestManagementComponent },
  { path: 'admin/tests/create', component: TestFormComponent },
  { path: 'admin/tests/edit/:id', component: TestFormComponent },
  {
    path: 'admin/tests/:id/manage',
    component: TestDetailManagementComponent,
  },
  {
    path: 'admin/parts/:partId/questions',
    component: QuestionManagementComponent,
  },
  {
    path: 'admin/parts/:partId/questions/create',
    component: QuestionFormComponent,
  },
  {
    path: 'admin/questions/:id/edit',
    component: QuestionFormComponent,
  },
  {
    path: 'admin/questions/:questionId/answers',
    component: AnswerManagementComponent,
  },
  {
    path: 'admin/questions/:questionId/answers/create',
    component: AnswerFormComponent,
  },
  {
    path: 'admin/answers/:id/edit',
    component: AnswerFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/create',
    component: TestPartFormComponent,
  },
  {
    path: 'admin/parts/:id/edit',
    component: TestPartFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },
];
