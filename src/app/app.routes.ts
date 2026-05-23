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
import { QuestionGroupFormComponent } from './features/admin/question-group-form/question-group-form.component';
import { QuestionGroupManagementComponent } from './features/admin/question-group-management/question-group-management.component';

export const routes: Routes = [
  //Public
  { path: '', redirectTo: 'tests', pathMatch: 'full' },
  { path: 'tests', component: TestListComponent },
  { path: 'tests/:id', component: TestDetailComponent },
  { path: 'result', component: ResultComponent },
  { path: 'review/:id', component: ReviewComponent },
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
  // Admin
  { path: 'admin/tests', component: TestManagementComponent },
  { path: 'admin/tests/create', component: TestFormComponent },
  { path: 'admin/tests/:testId/edit', component: TestFormComponent },
  {
    path: 'admin/tests/:testId/parts',
    component: TestDetailManagementComponent,
  },
  {
    path: 'admin/tests/:testId/parts/create',
    component: TestPartFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/edit',
    component: TestPartFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/groups',

    component: QuestionGroupManagementComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/groups/create',

    component: QuestionGroupFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/groups/:groupId/edit',

    component: QuestionGroupFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/groups/:groupId/questions',

    component: QuestionManagementComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/questions',
    component: QuestionManagementComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/questions/create',
    component: QuestionFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/questions/:questionId/edit',
    component: QuestionFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/questions/:questionId/answers',
    component: AnswerManagementComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/questions/:questionId/answers/create',
    component: AnswerFormComponent,
  },
  {
    path: 'admin/tests/:testId/parts/:partId/questions/:questionId/answers/:answerId/edit',
    component: AnswerFormComponent,
  },
];
