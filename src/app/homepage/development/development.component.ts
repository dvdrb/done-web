import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-development',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './development.component.html',
  styleUrl: './development.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent {
  private destroyRef = inject(DestroyRef);
  constructor(private translate: TranslateService) {}
  isCollapsed: boolean[] = Array(4).fill(true);

  steps: any[] = [];

  ngOnInit(): void {
    this.translate
      .stream(['n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16', 'n17'])
      .pipe(takeUntilDestroyed(this.destroyRef))
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

  trackByIndex(index: number) {
    return index;
  }
}
