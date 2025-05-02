window.addEventListener('DOMContentLoaded', () => {
    /* ───── Mobile nav ───── */
    const burger = document.getElementById('hamburger');
    const nav    = document.getElementById('nav-links');
  
    burger.addEventListener('click', () => {
      nav.classList.toggle('show');
      burger.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        nav.classList.remove('show');
        burger.classList.remove('open');
      })
    );
  
    /* ───── Footer year ───── */
    document.getElementById('year').textContent = new Date().getFullYear();
  
    /* ───── AOS animations ───── */
    AOS.init({ duration: 800, offset: 120, once: true });
  
    /* ───── Gallery slider ───── */
    const imgEl = document.getElementById('gallery-img'),
          prev  = document.getElementById('gallery-prev'),
          next  = document.getElementById('gallery-next');
    let index   = 1;
    const MAX   = 10;            // gallery photos (1-10)
    const updateSrc = () => {
      imgEl.src = `assets/gallery/${index}.jpg`;
    };
    prev.addEventListener('click', () => {
      index = index <= 1 ? MAX : index - 1;
      updateSrc();
    });
    next.addEventListener('click', () => {
      index = index >= MAX ? 1 : index + 1;
      updateSrc();
    });
  
    /* ───── Contact form ───── */
    emailjs.init('VbMN_0v-YMI3Dkf6z');                 // <-- replace
  
    const form      = document.getElementById('contact-form');
    const statusEl  = document.getElementById('form-status');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      statusEl.textContent = 'Sending…';
  
      const data = {
        from_name:  form.from_name.value.trim(),
        from_email: form.from_email.value.trim(),
        from_phone: form.from_phone.value.trim(), // Added phone number
        zip:        form.zip.value.trim(),
        message:    form.message.value.trim()
      };
  
      emailjs
        .send('service_90kuixp', 'template_va3tgrd', data)  // <-- replace
        .then(() => {
          statusEl.textContent = 'Thanks! Your message was sent. We\'ll get back to you within 48 hours.';
          form.reset();
        })
        .catch(err => {
          console.error(err);
          statusEl.textContent =
            'Sorry, something went wrong. Please try again or email us directly.';
        });
    });
  });
