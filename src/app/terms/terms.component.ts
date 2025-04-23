import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
})
export class TermsComponent {
  terms: { title: string; content: string }[] = [];

  constructor(private translate: TranslateService) {
    this.terms = [
      {
        title: this.translate.instant('n101'),
        content: this.translate.instant('n102'),
      },
      {
        title: this.translate.instant('n103'),
        content: this.translate.instant('n104'),
      },
      {
        title: this.translate.instant('n105'),
        content: this.translate.instant('n106'),
      },
      {
        title: this.translate.instant('n107'),
        content: this.translate.instant('n108'),
      },
      {
        title: this.translate.instant('n109'),
        content: this.translate.instant('n110'),
      },
      {
        title: this.translate.instant('n111'),
        content: this.translate.instant('n112'),
      },
      {
        title: this.translate.instant('n113'),
        content: this.translate.instant('n114'),
      },
      {
        title: this.translate.instant('n115'),
        content: this.translate.instant('n116'),
      },
      {
        title: this.translate.instant('n117'),
        content: this.translate.instant('n118'),
      },
      {
        title: this.translate.instant('n119'),
        content: this.translate.instant('n120'),
      },
    ];
  }
}
