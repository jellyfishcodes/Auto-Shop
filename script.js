const form = document.getElementById('appointment-form');
    const messageBox = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    // Only run if the form actually exists on the page
    if (form) {
        form.addEventListener('submit', function(e) {
            // This prevents the page from scrolling to the top!
            e.preventDefault();

            const formData = new FormData(form);

            // Update button state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Reset message box classes (removed the buggy inline style here)
            messageBox.className = 'form-message';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Success UI
                    messageBox.textContent = "Success! Your appointment request has been sent.";
                    messageBox.classList.add('success');
                    form.reset();
                } else {
                    // API Error UI
                    messageBox.textContent = json.message || "Something went wrong. Please try again.";
                    messageBox.classList.add('error');
                }
            })
            .catch(error => {
                // Network Error UI
                messageBox.textContent = "Something went wrong! Please check your internet connection.";
                messageBox.classList.add('error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = 'Request Appointment';
                submitBtn.disabled = false;
                
                // Hide the message after 5 seconds by removing the success/error class
                setTimeout(() => {
                    messageBox.className = 'form-message';
                }, 5000);
            });
        });
    } else {
        console.error("Form script loaded, but the form ID was not found in the HTML.");
    }
