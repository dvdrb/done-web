import { afterNextRender, ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DWD-website';

  constructor(private router: Router, private translate: TranslateService) {
    afterNextRender(() => {
      this.translate.setDefaultLang('en');
      this.translate.use(localStorage.getItem('lang') || 'en');
    });

    // Subscribe to router events to reset scroll position
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
