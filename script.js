const form = document.getElementById('appointment-form');
    const messageBox = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', function(e) {
        // Prevent the page from reloading
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);

        // Update button state to show it's working
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        messageBox.style.display = 'none';
        messageBox.className = 'form-message';

        // Send data to Web3Forms using Fetch API
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success: Show message and clear form
                messageBox.textContent = "Success! Your appointment request has been sent.";
                messageBox.classList.add('success');
                form.reset();
            } else {
                // API Error
                messageBox.textContent = json.message || "Something went wrong. Please try again.";
                messageBox.classList.add('error');
            }
        })
        .catch(error => {
            // Network/Browser Error
            messageBox.textContent = "Something went wrong! Please check your internet connection.";
            messageBox.classList.add('error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = 'Request Appointment';
            submitBtn.disabled = false;
            
            // Hide the success message after 5 seconds
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 5000);
        });
    });