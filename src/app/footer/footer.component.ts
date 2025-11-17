import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  constructor(private router: Router, private translate: TranslateService) {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    this.lang = stored || this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange.subscribe((e: LangChangeEvent) => (this.lang = e.lang));
  }
  lang: string = 'en';

  changeLang(lang: any) {
    const selectedLanguage = lang;

    localStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
  }

  scrollToElement(elementId: string): void {
    // Navigate to homepage with fragment
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
  ngOnInit(): void {}
}
