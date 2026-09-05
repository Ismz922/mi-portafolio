import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  // Variables de notificación
  showNotification = false;
  notificationType = 'success';
  notificationTitle = '';
  notificationMessage = '';
  notificationIcon = '';

  private readonly SERVICE_ID = 'service_05ja5yv';
  private readonly TEMPLATE_ID = 'template_d0y6myd';
  private readonly PUBLIC_KEY = '05-dJ0y2949ceArrb';

  // ✅ Inyectar ChangeDetectorRef y NgZone
  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  async sendEmail() {
    // Validaciones
    if (!this.formData.name.trim() || !this.formData.email.trim() || !this.formData.message.trim()) {
      this.mostrarNotificacion('error', 'Campos incompletos', 'Completa todos los campos.', 'fa-exclamation-circle');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.mostrarNotificacion('error', 'Email inválido', 'Ingresa un correo válido.', 'fa-exclamation-circle');
      return;
    }

    try {
      const templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        message: this.formData.message,
        to_name: 'Isaac Salazar'
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      console.log('✅ Correo enviado:', response);

      // ✅ Usar NgZone para forzar la actualización de la UI
      this.ngZone.run(() => {
        this.mostrarNotificacion(
          'success',
          '¡Mensaje enviado! 🎉',
          `Gracias ${this.formData.name}, tu mensaje ha sido enviado correctamente. Te responderé en menos de 24 horas.`,
          'fa-check-circle'
        );
      });

      // Limpiar el formulario
      this.formData = { name: '', email: '', message: '' };

    } catch (error) {
      console.error('❌ Error al enviar:', error);
      this.ngZone.run(() => {
        this.mostrarNotificacion(
          'error',
          'Error al enviar',
          'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
          'fa-times-circle'
        );
      });
    }
  }

  mostrarNotificacion(type: string, title: string, message: string, icon: string) {
    console.log('📢 Mostrando notificación:', { type, title, message, icon });
    
    // ✅ Asignar valores
    this.showNotification = true;
    this.notificationType = type;
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.notificationIcon = icon;

    // ✅ Forzar detección de cambios
    this.cdr.detectChanges();

    console.log('✅ Notificación activada, showNotification =', this.showNotification);

    // Ocultar después de 6 segundos
    setTimeout(() => {
      this.showNotification = false;
      this.cdr.detectChanges();
      console.log('🔴 Notificación ocultada');
    }, 6000);
  }

  ocultarNotificacion() {
    this.showNotification = false;
    this.cdr.detectChanges();
    console.log('🔴 Notificación ocultada manualmente');
  }
}