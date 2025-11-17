import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private router: Router, private translate: TranslateService) {
    // Initialize language from current translate service or localStorage
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    this.lang = stored || this.translate.currentLang || this.translate.getDefaultLang() || 'en';

    // Keep local state in sync when language changes elsewhere
    this.translate.onLangChange.subscribe((e: LangChangeEvent) => {
      this.lang = e.lang;
    });
  }
  private offcanvasService = inject(NgbOffcanvas);

  lang: string = 'en';

  changeLang(lang: any) {
    this.lang = lang;
    const selectedLanguage = lang;

    localStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
  }

  routerAndClose(routeer: string, offcanvas: NgbOffcanvasRef): void {
    offcanvas.dismiss('Navigation click');
    const route = routeer.replace(/^\//, '');
    this.router.navigate(['/', this.lang, route]);
  }
  navigateAndClose(elementId: string, offcanvasRef: NgbOffcanvasRef): void {
    offcanvasRef.dismiss('Navigation click');
    this.scrollToElement(elementId);
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'top' });
  }

  scrollToElement(elementId: string): void {
    // Navigate to homepage with fragment under current language
    this.router.navigate(['/', this.lang], { fragment: elementId }).then(() => {
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
