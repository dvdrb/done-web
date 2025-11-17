import { ChangeDetectionStrategy, Component, OnInit, DestroyRef, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css'],
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  lastUpdated = 'April 8, 2025';

  cookieTypes: any[] = [];
  thirdPartyCookies: string[] = [];
  managementOptions: string[] = [];
  browsers: string[] = [];
  contactInfo: any;

  constructor(private translate: TranslateService, private seo: SeoService) {}

  ngOnInit(): void {
    this.translate
      .stream([
        'meta.cookies.title',
        'meta.cookies.description',
        'breadcrumbs.home',
        'breadcrumbs.cookies',
      ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((t) => {
        this.seo.setMeta({
          title: t['meta.cookies.title'],
          description: t['meta.cookies.description'],
          path: '/cookies',
          breadcrumbs: [
            { name: t['breadcrumbs.home'], path: '/' },
            { name: t['breadcrumbs.cookies'], path: '/cookies' },
          ],
        });
      });

    const cookiesSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Cookie Policy',
      url: 'https://donewebdesigns.com/cookies',
    };
    this.seo.setJsonLd('cookies', cookiesSchema);

    this.translate
      .stream([
        'cookieTypes',
        'thirdPartyCookies',
        'managementOptions',
        'browsers',
        'contactInfo',
      ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((translations) => {
        this.cookieTypes = translations['cookieTypes'];
        this.thirdPartyCookies = translations['thirdPartyCookies'];
        this.managementOptions = translations['managementOptions'];
        this.browsers = translations['browsers'];
        this.contactInfo = translations['contactInfo'];
      });
  }

  trackByIndex(index: number) {
    return index;
  }
}
