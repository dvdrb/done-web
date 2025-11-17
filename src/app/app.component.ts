import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'DWD-website';
  @Inject(PLATFORM_ID) platformId: any;
  constructor(private router: Router, private translate: TranslateService) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo(0, 0);
        });
      // Keep <html lang> in sync with active language for SEO/AT
      const setLang = (l: string) => {
        document?.documentElement?.setAttribute('lang', l || 'en');
      };
      setLang(this.translate.currentLang || this.translate.getDefaultLang() || 'en');
      this.translate.onLangChange.subscribe((e) => setLang(e.lang));
    }
  }
}
