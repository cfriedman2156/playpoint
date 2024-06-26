const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log('posted info')
      if (response.ok) {
        console.log('response ok')
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('form.signup-form')
    .addEventListener('submit', signupFormHandler);
