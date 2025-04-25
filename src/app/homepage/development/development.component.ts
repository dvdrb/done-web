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
    this.translate
      .get(['n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17'])
      .subscribe((translations) => {
        this.steps = [
          {
            number: '01',
            title: translations['n10'],
            description: translations['n11'],
          },
          {
            number: '02',
            title: translations['n12'],
            description: translations['n13'],
          },
          {
            number: '03',
            title: translations['n14'],
            description: translations['n15'],
          },
          {
            number: '04',
            title: translations['n16'],
            description: translations['n17'],
          },
        ];
      });
  }
}
