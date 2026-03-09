/**
 * Contact Component for Version 1.0.1
 */

import { i18n } from '../../core/i18n/i18n.js';

class Contact {
  constructor() {
    this.init();
  }

  init() {
    this.initContactForm();
  }

  initContactForm() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (sendButton) {
      sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();

        if (!message) {
          alert(i18n.t('contact.message') || 'Please enter a message');
          return;
        }

        alert('Thank you for your message! This is a demo, so the message is not actually sent.');
        messageInput.value = '';
      });
    }
  }
}

export { Contact };