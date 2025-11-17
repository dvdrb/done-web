import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { DevelopmentComponent } from './development/development.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ChallangesComponent } from './challanges/challanges.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../shared/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DevelopmentComponent,
    SolutionsComponent,
    ChallangesComponent,
    ContactUsComponent,
    TranslatePipe,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate
      .stream(['meta.home.title', 'meta.home.description', 'breadcrumbs.home'])
      .pipe(takeUntilDestroyed())
      .subscribe((t) => {
        this.seo.setMeta({
          title: t['meta.home.title'],
          description: t['meta.home.description'],
          path: '/',
          breadcrumbs: [{ name: t['breadcrumbs.home'], path: '/' }],
        });
      });

    // Core org/site JSON-LD once on home
    this.seo.setJsonLd('organization', this.seo.organizationSchema());
    this.seo.setJsonLd('website', this.seo.websiteSchema());

    // Subscribe to fragment changes
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToElement(fragment);
      }
    });
  }

  ngAfterViewInit() {
    // Check for fragment after view initialization
    setTimeout(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        this.scrollToElement(fragment);
      }
    }, 500);
  }

  scrollToElement(elementId: string): void {
    // Navigate to homepage with fragment, keeping language prefix if present
    const lang = this.route.snapshot.paramMap.get('lang');
    const target = lang ? ['/', lang] : ['/'];
    this.router.navigate(target, { fragment: elementId }).then(() => {
      // After navigation, try to scroll to the element
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const isMobile = window.innerWidth < 768; // Bootstrap's lg breakpoint
          element.scrollIntoView({
            behavior: 'smooth',
            block: isMobile ? 'start' : 'center',
          });
        }
      }, 100);
    });
  }
}
