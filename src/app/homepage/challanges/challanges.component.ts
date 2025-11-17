import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-challanges',
  imports: [NgbCollapseModule, CommonModule, TranslatePipe],
  templateUrl: './challanges.component.html',
  styleUrl: './challanges.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallangesComponent {
  private destroyRef = inject(DestroyRef);
  constructor(private translate: TranslateService) {}
  isCollapsed: boolean[] = Array(3).fill(true);
  challanges: { number: string; title: string; description: string }[] = [];

  ngOnInit(): void {
    this.translate
      .stream(['n28', 'n29', 'n30', 'n31', 'n32', 'n33'])
      .pipe(takeUntilDestroyed(this.destroyRef))
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

  trackByIndex(index: number) {
    return index;
  }
}
