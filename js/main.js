function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    status.textContent = 'Bezig met versturen...';
    status.className = '';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = 'Bedankt! Uw bericht is verstuurd, we nemen zo snel mogelijk contact op.';
        status.className = 'success';
        form.reset();
      } else {
        status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.';
        status.className = 'error';
      }
    } catch (err) {
      status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.';
      status.className = 'error';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
});
