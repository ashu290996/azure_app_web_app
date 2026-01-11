// ═══════════════════════════════════════════════════════════════════════════
// Azure Web App - Main JavaScript
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Update server time every second
    updateServerTime();
    setInterval(updateServerTime, 1000);

    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Update server time display
function updateServerTime() {
    const timeElement = document.getElementById('serverTime');
    if (timeElement) {
        timeElement.textContent = new Date().toISOString();
    }
}

// Handle contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            formMessage.className = 'form-message success';
            formMessage.textContent = result.message;
            e.target.reset();
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = error.message;
    }

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}
