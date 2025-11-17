import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
  terms: { title: string; content: string }[] = [];

  constructor(private translate: TranslateService, private seo: SeoService) {}

  ngOnInit(): void {
    this.translate
      .stream([
        'meta.terms.title',
        'meta.terms.description',
        'breadcrumbs.home',
        'breadcrumbs.terms',
      ])
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        this.seo.setMeta({
          title: t['meta.terms.title'],
          description: t['meta.terms.description'],
          path: '/terms',
          breadcrumbs: [
            { name: t['breadcrumbs.home'], path: '/' },
            { name: t['breadcrumbs.terms'], path: '/terms' },
          ],
        });
      });

    const termsSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Terms & Conditions',
      url: 'https://donewebdesigns.com/terms',
    };
    this.seo.setJsonLd('terms', termsSchema);

    this.translate
      .stream([
        'n101',
        'n102',
        'n103',
        'n104',
        'n105',
        'n106',
        'n107',
        'n108',
        'n109',
        'n110',
        'n111',
        'n112',
        'n113',
        'n114',
        'n115',
        'n116',
        'n117',
        'n118',
        'n119',
        'n120',
      ])
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        this.terms = [
          { title: t['n101'], content: t['n102'] },
          { title: t['n103'], content: t['n104'] },
          { title: t['n105'], content: t['n106'] },
          { title: t['n107'], content: t['n108'] },
          { title: t['n109'], content: t['n110'] },
          { title: t['n111'], content: t['n112'] },
          { title: t['n113'], content: t['n114'] },
          { title: t['n115'], content: t['n116'] },
          { title: t['n117'], content: t['n118'] },
          { title: t['n119'], content: t['n120'] },
        ];
      });
  }
}
