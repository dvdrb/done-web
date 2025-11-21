import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

type SeoInput = {
  title: string;
  description: string;
  path: string; // path starting with '/'
  image?: string;
  breadcrumbs?: { name: string; path: string }[];
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteUrl = 'https://donewebdesigns.com';
  private readonly siteName = 'Done Web Design';
  private readonly defaultImage = `${this.siteUrl}/dwd-logo.png`;

  constructor(
    private meta: Meta,
    private title: Title,
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  setMeta(input: SeoInput) {
    const currentPath = (this.doc && (this.doc.location?.pathname || input.path)) || input.path;
    const url = this.siteUrl + currentPath;
    const image = input.image || this.defaultImage;

    this.title.setTitle(input.title);

    this.updateTag('description', input.description);
    this.updateTag('og:title', input.title, 'property');
    this.updateTag('og:description', input.description, 'property');
    this.updateTag('og:type', 'website', 'property');
    this.updateTag('og:url', url, 'property');
    this.updateTag('og:site_name', this.siteName, 'property');
    this.updateTag('og:image', image, 'property');
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    const ogLocale = lang === 'ro' ? 'ro_RO' : 'en_US';
    this.updateTag('og:locale', ogLocale, 'property');
    // Add alternates
    this.updateTag('og:locale:alternate', lang === 'ro' ? 'en_US' : 'ro_RO', 'property');

    this.updateTag('twitter:card', 'summary_large_image', 'name');
    this.updateTag('twitter:title', input.title, 'name');
    this.updateTag('twitter:description', input.description, 'name');
    this.updateTag('twitter:image', image, 'name');

    this.setCanonical(url);
    this.setHrefLangs(currentPath);

    if (input.breadcrumbs && input.breadcrumbs.length) {
      const json = this.buildBreadcrumbList(input.breadcrumbs);
      this.setJsonLd('breadcrumbs', json);
    }
  }

  setJsonLd(id: string, data: any) {
    const head = this.doc.head;
    if (!head) return;
    const scriptId = `jsonld-${id}`;
    let script = this.doc.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      head.appendChild(script);
    }
    script.text = JSON.stringify(data);
  }

  removeJsonLd(id: string) {
    const el = this.doc.getElementById(`jsonld-${id}`);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  // Helpers
  private updateTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
    this.meta.updateTag({ [attr]: name, content });
  }

  private setCanonical(url: string) {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setHrefLangs(currentPath: string) {
    // Build alternates for /en/... and /ro/... + x-default without prefix
    const strip = (p: string) => p.replace(/^\/(en|ro)(\/|$)/, '/');
    const base = strip(currentPath);

    Array.from(this.doc.querySelectorAll('link[rel="alternate"][hreflang]'))
      .forEach((n) => n.parentNode?.removeChild(n));

    for (const l of ['en', 'ro'] as const) {
      const link = this.doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l);
      link.setAttribute('href', `${this.siteUrl}/${l}${base}`.replace('//', '/'));
      this.doc.head.appendChild(link);
    }
    const x = this.doc.createElement('link');
    x.setAttribute('rel', 'alternate');
    x.setAttribute('hreflang', 'x-default');
    x.setAttribute('href', `${this.siteUrl}${base}`);
    this.doc.head.appendChild(x);
  }

  private buildBreadcrumbList(items: { name: string; path: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: `${this.siteUrl}${b.path}`,
      })),
    };
  }

  // Predefined schemas
  organizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.siteName,
      url: this.siteUrl,
      logo: `${this.siteUrl}/dwd-logo.png`,
      sameAs: [
        'https://www.linkedin.com/company/done-web-designs',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'conludo.office@yahoo.com',
        telephone: '+40 734 102 096',
        areaServed: ['EU', 'US'],
        availableLanguage: ['en', 'ro'],
      },
    };
  }

  websiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: this.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }
}
