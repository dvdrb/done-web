import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const langGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const translate = inject(TranslateService);
  const lang = route.params['lang'];
  const supported = ['en', 'ro'];
  if (!supported.includes(lang)) {
    // Unknown language; redirect to root without prefix
    router.navigate(['/']);
    return false;
  }
  try {
    localStorage.setItem('lang', lang);
  } catch {}
  translate.use(lang);
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lang);
  }
  return true;
};

