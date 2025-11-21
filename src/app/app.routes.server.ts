import { RenderMode, ServerRoute } from '@angular/ssr';

const langs = ['en', 'ro'];

export const serverRoutes: ServerRoute[] = [
  // Unprefixed
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about-us', renderMode: RenderMode.Prerender },
  { path: 'faqs', renderMode: RenderMode.Prerender },
  { path: 'cookies', renderMode: RenderMode.Prerender },
  { path: 'terms', renderMode: RenderMode.Prerender },

  // Language-prefixed with params
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map((lang) => ({ lang })),
  },
  {
    path: ':lang/about-us',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map((lang) => ({ lang })),
  },
  {
    path: ':lang/faqs',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map((lang) => ({ lang })),
  },
  {
    path: ':lang/cookies',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map((lang) => ({ lang })),
  },
  {
    path: ':lang/terms',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langs.map((lang) => ({ lang })),
  },
];
