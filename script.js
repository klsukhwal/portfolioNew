document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
  
    // Handle form submission
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
  
      // Send form data using Fetch API
      fetch('/contact', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Show success message and reset form
          successMessage.style.display = 'block';
          contactForm.reset();
        } else {
          console.error('Error occurred while sending message.');
        }
      })
      .catch(error => {
        console.error('Error occurred while sending message:', error);
      });
    });
  });
  