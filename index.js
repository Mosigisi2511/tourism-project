document.addEventListener("DOMContentLoaded", () => {
    // Slideshow
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    // Contact Form Validation
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (validateForm(name, email, message)) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    function validateForm(name, email, message) {
        if (name === '') {
            alert('Name is required');
            return false;
        }

        if (email === '') {
            alert('Email is required');
            return false;
        } else if (!validateEmail(email)) {
            alert('Invalid email format');
            return false;
        }

        if (message === '') {
            alert('Message is required');
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Google Maps
    initMap();

    function initMap() {
        const masaiMara = { lat: -1.4061, lng: 35.0480 };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: masaiMara,
        });
        new google.maps.Marker({
            position: masaiMara,
            map,
            title: "Masai Mara National Reserve",
        });
    }

    // Google Calendar Event
    const calendarLink = document.getElementById('calendar-link');
    calendarLink.addEventListener('click', (event) => {
        event.preventDefault();
        const calendarUrl = generateGoogleCalendarUrl({
            title: "Safari Tour Booking",
            location: "Masai Mara, Kenya",
            details: "Join us for an unforgettable safari tour.",
            start: new Date('2024-07-01T09:00:00'),
            end: new Date('2024-07-01T18:00:00'),
        });
        window.open(calendarUrl, '_blank');
    });

    function generateGoogleCalendarUrl({ title, location, details, start, end }) {
        const base = "https://calendar.google.com/calendar/r/eventedit";
        const params = new URLSearchParams({
            text: title,
            location: location,
            details: details,
            dates: formatGoogleCalendarDate(start) + "/" + formatGoogleCalendarDate(end),
        });
        return `${base}?${params.toString()}`;
    }

    function formatGoogleCalendarDate(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, "");
    }
});


