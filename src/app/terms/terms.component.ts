import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
})
export class TermsComponent {
  terms = [
    {
      title: '2. Our Services',
      content:
        'We offer professional web design and web development services, including building websites, web security, optimization, maintenance, and digital consulting. The information provided on this site is for informational purposes only. For personalized offers, please contact us directly.',
    },
    {
      title: '3. Eligibility',
      content:
        'To work with our company, you must be at least 18 years old or be the legal representative of a legal entity. By using this site, you confirm that you meet these requirements.',
    },
    {
      title: '4. Intellectual Property',
      content:
        'All materials on this site - including texts, images, code, logos, layouts, and visual content - are our property or are used with permission and are protected by copyright and intellectual property laws. Copying, reproducing, distributing, or reusing any content without our written consent is strictly prohibited.',
    },
    {
      title: '5. Inquiries and Collaborations',
      content:
        'Submitting an inquiry through the contact form, email, or other channels does not automatically guarantee the acceptance of a collaboration. We reserve the right to select projects based on internal criteria, availability, and the specifics of each request.',
    },
    {
      title: '6. Quotation and Payment',
      content:
        'Each project is subject to a customized quotation based on its complexity, duration, and client requirements. Payment terms are based on an invoice, under the terms agreed upon in the contract or commercial offer. Generally, we require an advance payment before starting the work. We reserve the right to suspend work in the event of non-payment or prolonged delay.',
    },
    {
      title: '7. Limitation of Liability',
      content:
        "We are not responsible for any data loss, decrease in traffic, technical issues, or indirect consequences arising from the use of websites developed by us, unless caused by our gross negligence. It is the client's responsibility to ensure regular backups, data security, and the quality of the content provided.",
    },
    {
      title: '8. Third-Party Links',
      content:
        'Our website may contain links to external sites. We have no control over the content of these sites and accept no responsibility for their policies or any damages resulting from accessing them.',
    },
    {
      title: '9. Privacy and Data Protection',
      content:
        'Personal data collected through the contact form or direct communication is handled with the utmost confidentiality and in accordance with GDPR legislation. We do not sell or distribute this data to third parties, unless necessary for the execution of a collaboration and with your consent.',
    },
    {
      title: '10. Changes to the Terms',
      content:
        'We may update these Terms periodically. Any changes will be published on this page, and continued use of the site implies acceptance of the updated version.',
    },
    {
      title: '11. Governing Law',
      content:
        'These Terms are governed by Romanian law. Any disputes related to these Terms shall be settled by the competent courts of Romania.',
    },
  ];
}
