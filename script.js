import axios from 'axios';

// Handle form submission
const handleFormSubmit = async () => {
  const formData = new FormData();
  formData.append('name', 'John');
  formData.append('email', 'john@example.com');
  formData.append('message', 'Hello, World!');

  try {
    const response = await axios.post('http://localhost:8000/contact', formData);
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
