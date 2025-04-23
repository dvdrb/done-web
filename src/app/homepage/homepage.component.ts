import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { DevelopmentComponent } from './development/development.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ChallangesComponent } from './challanges/challanges.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TranslatePipe } from '@ngx-translate/core';

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
})
export class HomepageComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
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
