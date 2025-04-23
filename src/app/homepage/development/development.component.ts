import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-development',
  imports: [
    MatCardModule,
    CommonModule,
    MatExpansionModule,
    NgbCollapseModule,
    TranslatePipe,
  ],
  templateUrl: './development.component.html',
  styleUrl: './development.component.css',
})
export class DevelopmentComponent {
  constructor(private translate: TranslateService) {}
  isCollapsed: boolean[] = Array(4).fill(true);

  steps: any[] = [];

  ngOnInit(): void {
    this.steps = [
      {
        number: '01',
        title: this.translate.instant('n10'),
        description: this.translate.instant('n11'),
      },
      {
        number: '02',
        title: this.translate.instant('n12'),
        description: this.translate.instant('n13'),
      },
      {
        number: '03',
        title: this.translate.instant('n14'),
        description: this.translate.instant('n15'),
      },
      {
        number: '04',
        title: this.translate.instant('n16'),
        description: this.translate.instant('n17'),
      },
    ];
  }
}
