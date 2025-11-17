import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
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
  lang: string = 'en';
  isMenuOpen = false;

  changeLang(lang: any) {
    this.lang = lang;
    const selectedLanguage = lang;

    localStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
  }

  routerAndClose(routeer: string): void {
    this.isMenuOpen = false;
    const route = routeer.replace(/^\//, '');
    this.router.navigate(['/', this.lang, route]);
  }
  navigateAndClose(elementId: string): void {
    this.isMenuOpen = false;
    this.scrollToElement(elementId);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
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
