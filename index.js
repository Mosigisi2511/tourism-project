// Initialize and add the map
function initMap() {
    const kenya = { lat: -1.286389, lng: 36.817223 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: kenya,
    });

    // Load data and add markers
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.attractions.forEach(attraction => {
                const marker = new google.maps.Marker({
                    position: attraction.location,
                    map: map,
                    title: attraction.name,
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<h3>${attraction.name}</h3><p>${attraction.description}</p>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        });
}

// Load destinations, tours, accommodations, events, and reviews
function loadContent() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Load destinations
            const destinationList = document.getElementById('destination-list');
            data.destinations.forEach(destination => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${destination.name}</h3><p>${destination.description}</p>`;
                destinationList.appendChild(div);
            });

            // Load virtual tours
            const toursGallery = document.getElementById('tours-gallery');
            data.tours.forEach(tour => {
                const img = document.createElement('img');
                img.src = tour.image;
                img.alt = tour.name;
                toursGallery.appendChild(img);
            });

            // Load accommodations
            const accommodationList = document.getElementById('accommodation-list');
            data.accommodations.forEach(accommodation => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${accommodation.name}</h3><p>${accommodation.description}</p>`;
                accommodationList.appendChild(div);
            });

            // Load events
            const eventList = document.getElementById('event-list');
            data.events.forEach(event => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${event.name}</h3><p>${event.date}</p><p>${event.description}</p>`;
                eventList.appendChild(div);
            });

            // Load reviews
            const reviewList = document.getElementById('review-list');
            data.reviews.forEach(review => {
                const div = document.createElement('div');
                div.innerHTML = `<h4>${review.user}</h4><p>Rating: ${review.rating}</p><p>${review.comment}</p>`;
                reviewList.appendChild(div);
            });
        });
}

// Function to handle review submission
function handleReviewSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('user-name').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    // Create a new review div
    const reviewList = document.getElementById('review-list');
    const newReview = document.createElement('div');
    newReview.innerHTML = `<h4>${name}</h4><p>Rating: ${rating}</p><p>${comment}</p>`;
    reviewList.appendChild(newReview);

    // Reset form
    document.getElementById('add-review').reset();
}

// Load content on window load
window.onload = () => {
    loadContent();
    document.getElementById('add-review').addEventListener('submit', handleSubmit);
};

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Fetch form values
    let name = document.getElementById('name').value;
    let rating = document.getElementById('rating').value;
    let comment = document.getElementById('comment').value;

    // Example validation (you can add more robust validation as needed)
    if (!name || !rating || !comment) {
        alert('Please fill out all fields.');
        return;
    }

    // Example: You can handle the submission via fetch or send to a backend server
    // Replace with your own logic for submitting data (e.g., sending to a server)
    // For demonstration purposes, we'll just log the data to console
    console.log('Name:', name);
    console.log('Rating:', rating);
    console.log('Comment:', comment);

    // Clear form fields after submission
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('comment').value = '';

    // Optional: Display a success message or update the UI
    alert('Review submitted successfully!');
}
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  function initClient() {
    gapi.client.init({
      apiKey: 'YOUR_API_KEY',
      clientId: 'YOUR_CLIENT_ID',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    }).then(function() {
      // Handle successful initialization
      // Check if user is already signed in
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        gapi.auth2.getAuthInstance().signIn();
      }
    }).catch(function(error) {
      console.error('Error initializing Google API client:', error);
    });
  }
  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary', // Use 'primary' for user's primary calendar
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      // Handle events data
      console.log('Events:', events);
    }).catch(function(error) {
      console.error('Error fetching events:', error);
    });
  }
    