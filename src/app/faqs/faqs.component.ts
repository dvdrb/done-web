import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from '../shared/seo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqsComponent implements OnInit {
  constructor(private seo: SeoService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate
      .stream([
        'meta.faqs.title',
        'meta.faqs.description',
        'breadcrumbs.home',
        'breadcrumbs.faqs',
      ])
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        this.seo.setMeta({
          title: t['meta.faqs.title'],
          description: t['meta.faqs.description'],
          path: '/faqs',
          breadcrumbs: [
            { name: t['breadcrumbs.home'], path: '/' },
            { name: t['breadcrumbs.faqs'], path: '/faqs' },
          ],
        });
      });

    // Build minimal FAQPage JSON-LD from a subset of translated Q&As
    const pairs: [string, string][] = [
      ['n66', 'n67'],
      ['n74', 'n75'],
      ['n83', 'n84'],
      ['n85', 'n86'],
      ['n87', 'n88'],
      ['n89', 'n90'],
      ['n91', 'n92'],
      ['n93', 'n94'],
      ['n95', 'n96'],
      ['n97', 'n98'],
    ];
    this.translate
      .stream(pairs.flat())
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        const mainEntity = pairs.map(([q, a]) => ({
          '@type': 'Question',
          name: t[q],
          acceptedAnswer: { '@type': 'Answer', text: t[a] },
        }));
        const faqSchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity,
        };
        this.seo.setJsonLd('faq', faqSchema);
      });
  }
}
