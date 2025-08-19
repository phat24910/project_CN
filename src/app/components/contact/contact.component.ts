import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
    private notification: NzNotificationService,
    private transloco: TranslocoService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      //Lấy ds liên hệ đã lưu
      const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      //Thêm dữ liệu mới vào ds
      savedContacts.push({ ...this.contactData, date: new Date().toISOString() });
      //Lưu lại vào local
      localStorage.setItem('contacts', JSON.stringify(savedContacts));
      // Xử lý gửi form liên hệ
      this.notification.success(
        this.transloco.translate('contact.success.title'),
        this.transloco.translate('contact.success.message')
      );
      form.resetForm();
    } else {
      this.notification.warning(
        this.transloco.translate('contact.error.title'),
        this.transloco.translate('contact.error.message')
      );
    }
  }

  contactInfo = [
    {
      icon: 'environment',
      title: 'contact.info.address.title',
      content: 'contact.info.address.content',
      link: 'https://maps.google.com'
    },
    {
      icon: 'phone',
      title: 'contact.info.phone.title',
      content: 'contact.info.phone.content',
      link: 'tel:+84123456789'
    },
    {
      icon: 'mail',
      title: 'contact.info.email.title',
      content: 'contact.info.email.content',
      link: 'mailto:info@example.com'
    },
    {
      icon: 'clock-circle',
      title: 'contact.info.hours.title',
      content: 'contact.info.hours.content'
    }
  ];

  socialLinks = [
    { icon: 'facebook', link: 'https://facebook.com', color: 'bg-blue-600' },
    { icon: 'instagram', link: 'https://instagram.com', color: 'bg-pink-600' },
    { icon: 'linkedin', link: 'https://linkedin.com', color: 'bg-blue-700' },
    { icon: 'twitter', link: 'https://twitter.com', color: 'bg-blue-400' }
  ];
}

