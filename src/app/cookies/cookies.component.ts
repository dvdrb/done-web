import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css'],
  standalone: true,
  imports: [CommonModule, TranslatePipe],
})
export class CookiesComponent implements OnInit {
  lastUpdated = 'April 8, 2025';

  cookieTypes: any[] = [];
  thirdPartyCookies: string[] = [];
  managementOptions: string[] = [];
  browsers: string[] = [];
  contactInfo: any;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate
      .get([
        'cookieTypes',
        'thirdPartyCookies',
        'managementOptions',
        'browsers',
        'contactInfo',
      ])
      .subscribe((translations) => {
        this.cookieTypes = translations['cookieTypes'];
        this.thirdPartyCookies = translations['thirdPartyCookies'];
        this.managementOptions = translations['managementOptions'];
        this.browsers = translations['browsers'];
        this.contactInfo = translations['contactInfo'];
      });
  }
}
