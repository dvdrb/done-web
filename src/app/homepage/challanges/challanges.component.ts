import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-challanges',
  imports: [NgbCollapseModule, CommonModule, TranslatePipe],
  templateUrl: './challanges.component.html',
  styleUrl: './challanges.component.css',
})
export class ChallangesComponent {
  constructor(private translate: TranslateService) {}
  isCollapsed: boolean[] = Array(3).fill(true);
  challanges: { number: string; title: string; description: string }[] = [];

  ngOnInit(): void {
    this.challanges = [
      {
        number: '01',
        title: this.translate.instant('n28'),
        description: this.translate.instant('n29'),
      },
      {
        number: '02',
        title: this.translate.instant('n30'),
        description: this.translate.instant('n31'),
      },
      {
        number: '03',
        title: this.translate.instant('n32'),
        description: this.translate.instant('n33'),
      },
    ];
  }
}
