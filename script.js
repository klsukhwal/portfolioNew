// Handle form submission

const handleFormSubmit = async () => {
  const formData = {
    name: 'John',
    email: 'john@example.com',
    message: 'Hello, World!',
  };

  try {
    const response = await axios.post('http://localhost:8000/contact', querystring.stringify(formData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = response.data;
    if (data.success) {
      console.log('Message sent successfully!');
    } else {
      console.error('Error occurred while sending message.');
    }
  } catch (error) {
    console.error('Error occurred while sending message:', error);
  }
};

// Call the form submission function
handleFormSubmit();
