import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { after } from 'node:test';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  constructor(private router: Router, private translate: TranslateService) {}
  lang: string = '';

  changeLang(lang: any) {
    const selectedLanguage = lang;

    localStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
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
  ngOnInit(): void {}
}
