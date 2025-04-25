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
    this.translate
      .get(['n28', 'n29', 'n30', 'n31', 'n32', 'n33'])
      .subscribe((translations) => {
        this.challanges = [
          {
            number: '01',
            title: translations['n28'],
            description: translations['n29'],
          },
          {
            number: '02',
            title: translations['n30'],
            description: translations['n31'],
          },
          {
            number: '03',
            title: translations['n32'],
            description: translations['n33'],
          },
        ];
      });
  }
}
