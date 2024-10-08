
  document.addEventListener('DOMContentLoaded', function() {
    // Function to get signed-in user
    function getSignedInUser() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      return users.find(user => user.signedIn);
    }

    // Get the navigation link with the 'user-login' class
    const userLoginLink = document.querySelector('.user-login');

    if (userLoginLink) {
      // Get the signed-in user
      const signedInUser = getSignedInUser();

      // Add click event listener to the navigation link
      userLoginLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        if (signedInUser) {
          window.location.href = 'dashboard.html'; // Redirect to dashboard if logged in
        } else {
          window.location.href = 'login.html'; // Redirect to login if not logged in
        }
      });

      // Optionally, add the 'signed' class to the navigation link if the user is logged in
      if (signedInUser) {
        userLoginLink.classList.add('signed');
      }
    } else {
      console.error('Navigation link with class "user-login" not found');
    }
  });
