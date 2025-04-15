import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallangesComponent } from '../homepage/challanges/challanges.component';
import { ContactUsComponent } from '../homepage/contact-us/contact-us.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, ChallangesComponent, ContactUsComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {}
