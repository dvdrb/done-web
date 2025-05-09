import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private translate: TranslateService) {}
  private offcanvasService = inject(NgbOffcanvas);

  lang: string = 'en';

  changeLang(lang: any) {
    this.lang = lang;
    const selectedLanguage = lang;
    console.log(selectedLanguage);
    localStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
  }

  routerAndClose(routeer: string, offcanvas: NgbOffcanvasRef): void {
    offcanvas.dismiss('Navigation click');
    this.router.navigate([routeer]);
  }
  navigateAndClose(elementId: string, offcanvasRef: NgbOffcanvasRef): void {
    offcanvasRef.dismiss('Navigation click');
    this.scrollToElement(elementId);
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'top' });
  }

  scrollToElement(elementId: string): void {
    // Navigate to homepage with fragment
    this.router.navigate(['/'], { fragment: elementId }).then(() => {
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
