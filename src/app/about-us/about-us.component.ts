import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallangesComponent } from '../homepage/challanges/challanges.component';
import { ContactUsComponent } from '../homepage/contact-us/contact-us.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../shared/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    ChallangesComponent,
    ContactUsComponent,
    TranslatePipe,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent implements OnInit {
  constructor(private seo: SeoService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate
      .stream([
        'meta.about.title',
        'meta.about.description',
        'breadcrumbs.home',
        'breadcrumbs.about',
      ])
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        this.seo.setMeta({
          title: t['meta.about.title'],
          description: t['meta.about.description'],
          path: '/about-us',
          breadcrumbs: [
            { name: t['breadcrumbs.home'], path: '/' },
            { name: t['breadcrumbs.about'], path: '/about-us' },
          ],
        });
      });

    const aboutSchema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Done Web Design',
      url: 'https://donewebdesigns.com/about-us',
      mainEntity: this.seo.organizationSchema(),
    };
    this.seo.setJsonLd('about', aboutSchema);
  }
}
