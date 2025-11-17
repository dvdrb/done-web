import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../shared/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsComponent implements OnInit {
  constructor(private seo: SeoService, private translate: TranslateService) {}

  ngOnInit(): void {
    // This component sits inside Home; we avoid resetting page-level meta here.
    // If this were routed, we would set a Services schema like below:
    this.translate
      .stream(['meta.service.name'])
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        const servicesSchema = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: t['meta.service.name'],
          provider: this.seo.organizationSchema(),
          areaServed: ['EU', 'US'],
          serviceType: 'Web development',
          offers: {
            '@type': 'Offer',
            priceSpecification: { '@type': 'PriceSpecification' },
            availability: 'https://schema.org/InStock',
          },
        };
        this.seo.setJsonLd('services', servicesSchema);
      });
  }
}
