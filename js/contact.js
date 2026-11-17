(() => {
   const form = document.querySelector('#contact-form');
   if (!form) return;

   const status = document.querySelector('#form-status');
   const fields = form.querySelectorAll('input, textarea');

   const messages = {
      name: {
         empty: 'Contanos tu nombre, que no mordemos (solo las pizzas).',
         short: 'El nombre debe tener al menos 2 caracteres.'
      },
      email: {
         empty: 'Necesitamos tu email para responderte.',
         invalid: 'Ese email no parece válido. Revisá el formato: tu@email.com'
      },
      message: {
         empty: 'Escribinos algo, aunque sea el sabor que buscás.',
         short: 'El mensaje debe tener al menos 10 caracteres.'
      }
   };

   function getError(field) {
      const value = field.value.trim();
      const msg = messages[field.name];

      if (!value) return msg.empty;
      if (field.name === 'name' && value.length < 2) return msg.short;
      if (field.name === 'message' && value.length < 10) return msg.short;
      if (field.name === 'email' && field.validity.typeMismatch) return msg.invalid;
      return '';
   }

   function validateField(field) {
      const group = field.closest('.form-group');
      const errorBox = group.querySelector('.error-message');
      const error = getError(field);

      errorBox.textContent = error;
      group.classList.toggle('invalid', Boolean(error));
      group.classList.toggle('valid', !error);
      field.setAttribute('aria-invalid', error ? 'true' : 'false');

      return !error;
   }

   fields.forEach(field => {
      // Valida al salir del campo
      field.addEventListener('blur', () => validateField(field));

      // Si ya estaba en error, se corrige en vivo mientras escribe
      field.addEventListener('input', () => {
         if (field.closest('.form-group').classList.contains('invalid')) {
            validateField(field);
         }
      });
   });

   form.addEventListener('submit', event => {
      event.preventDefault();
      status.textContent = '';

      let firstInvalid = null;

      fields.forEach(field => {
         if (!validateField(field) && !firstInvalid) {
            firstInvalid = field;
         }
      });

      if (firstInvalid) {
         firstInvalid.focus();
         return;
      }

      // Acá iría el envío real (fetch a un backend o servicio de formularios).
      // Por ahora solo se simula el éxito.
      status.textContent = '¡Gracias! Tu mensaje fue enviado. 🍕';
      form.reset();

      form.querySelectorAll('.form-group').forEach(group => {
         group.classList.remove('valid', 'invalid');
         group.querySelector('.error-message').textContent = '';
      });

      setTimeout(() => { status.textContent = ''; }, 5000);
   });
})();