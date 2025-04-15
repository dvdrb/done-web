import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-development',
  imports: [MatCardModule, CommonModule, MatExpansionModule, NgbCollapseModule],
  templateUrl: './development.component.html',
  styleUrl: './development.component.css',
})
export class DevelopmentComponent {
  isCollapsed: boolean[] = Array(4).fill(true);

  steps = [
    {
      number: '01',
      title: 'Consult your idea',
      description:
        'We start by understanding your vision and goals-then help shape them into a clear, actionable plan.',
    },
    {
      number: '02',
      title: 'Choose',
      description:
        'We recommend the most effective technologies based on your needs, scalability, and timeline.',
    },
    {
      number: '03',
      title: 'Design',
      description:
        'From wireframes to UI/UX, we design intuitive, user-focused experiences that stand out.',
    },
    {
      number: '04',
      title: 'Develop',
      description:
        'Our developers bring your product to life with clean code and reliable architecture.',
    },
  ];
}
