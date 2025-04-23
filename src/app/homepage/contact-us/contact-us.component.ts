import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.http
        .post('https://formspree.io/f/xqapnwnq', this.contactForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Message sent successfully!', 'Close', {
              duration: 3000,
            });
            this.contactForm.reset();
          },
          error: (error) => {
            this.snackBar.open(
              'Error sending message. Please try again.',
              'Close',
              {
                duration: 3000,
              }
            );
            console.error('Form submission error:', error);
          },
          complete: () => {
            this.isSubmitting = false;
          },
        });
    }
  }
}
