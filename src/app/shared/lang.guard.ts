import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const langGuard: CanMatchFn = (route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const translate = inject(TranslateService);
  const platformId = inject(PLATFORM_ID);
  const part = segments[0]?.path;
  const supported = ['en', 'ro'];
  if (!part || !supported.includes(part)) {
    // Redirect unknown language to root without prefix
    return router.parseUrl('/');
  }
  // Switch translation; avoid browser-only APIs during SSR
  translate.use(part);
  if (isPlatformBrowser(platformId)) {
    try {
      localStorage.setItem('lang', part);
    } catch {}
  }
  return true;
};
