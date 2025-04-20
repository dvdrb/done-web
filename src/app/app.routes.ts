import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./homepage/homepage.component').then((m) => m.HomepageComponent),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then((m) => m.AboutUsComponent),
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./cookies/cookies.component').then((m) => m.CookiesComponent),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./terms/terms.component').then((m) => m.TermsComponent),
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./faqs/faqs.component').then((m) => m.FaqsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./homepage/homepage.component').then((m) => m.HomepageComponent),
  },
];
