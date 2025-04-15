import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent {
  lastUpdated = 'April 8, 2025';

  cookieTypes = [
    {
      title: '2.1. Strictly Necessary Cookies',
      content:
        'These cookies are essential for the proper functioning of our website. They enable basic functionalities such as page navigation and access to secure areas of the website. These cookies do not collect information that could be used for marketing purposes or to track your browsing activities.',
      examples:
        'Examples: session cookies, authentication cookies, shopping cart cookies.',
    },
    {
      title: '2.2. Preference Cookies',
      content:
        'These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personalized features.',
      examples:
        'Examples: language preference cookies, font size preference cookies.',
    },
    {
      title: '2.3. Statistical (Analytical) Cookies',
      content:
        'These cookies collect information about how visitors use our website, such as which pages are visited most often and whether users encounter error messages. This data helps us improve how our website functions.',
      examples:
        'Examples: Google Analytics cookies, which help us understand how visitors interact with our website.',
    },
    {
      title: '2.4. Marketing Cookies',
      content:
        'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.',
      examples:
        'Examples: cookies for personalized ads, cookies for social media platforms.',
    },
  ];

  thirdPartyCookies = [
    'Analytics services (such as Google Analytics) - to help us understand how visitors interact with our site',
    'Advertising networks - to deliver relevant advertisements on other websites',
    'Social media platforms (such as Facebook, Twitter) - to enable content sharing and interaction with our pages',
  ];

  managementOptions = [
    'Delete existing cookies from your device',
    'Block cookies from being placed on your device',
    'Configure your browser to notify you before accepting cookies',
    'Accept only certain types of cookies',
  ];

  browsers = ['Google Chrome', 'Mozilla Firefox', 'Microsoft Edge', 'Safari'];

  contactInfo = {
    email: 'contact.office@yahoo.com',
    address: 'Str. Maria Rosetti no.30, Bucharest, Romania',
    phone: '+40 754 192 036',
  };
}
