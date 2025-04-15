import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-challanges',
  imports: [NgbCollapseModule, CommonModule],
  templateUrl: './challanges.component.html',
  styleUrl: './challanges.component.css',
})
export class ChallangesComponent {
  isCollapsed: boolean[] = Array(3).fill(true);
  challanges = [
    {
      number: '01',
      title: 'Quick market entry',
      description:
        'We help startups and businesses launch their web platforms faster with agile development and smart design, getting them market-ready in record time.',
    },
    {
      number: '02',
      title: 'Digital acceleration',
      description:
        ' Our team builds modern, scalable websites and applications that drive growth, streamline operations, and future-proof your digital presence.',
    },
    {
      number: '03',
      title: 'Product expansion',
      description:
        'From idea to launch - and beyond. We support businesses in expanding their digital products with new features, better user experiences, and cutting-edge technologies.',
    },
  ];
}
