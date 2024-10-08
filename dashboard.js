// هنا يمكنك تعديل قائمة العناصر في قائمة الأماني
const wishlistItems = [
    { imageUrl: "img/monitors/monitor5.jpg", name: "Item 1" },
    { imageUrl: "img/decktops/desktop4.jpg", name: "Item 2" },
    { imageUrl: "img/laptops/lap4.jpg", name: "Item 3" },
];

// تحديث محتوى قائمة الأماني
const wishlistContainer = document.getElementById('wishlistContainer');
const emptyWishlist = document.getElementById('emptyWishlist');

if (wishlistItems.length === 0) {
    emptyWishlist.style.display = 'block'; // عرض رسالة "لا توجد عناصر"
} else {
    wishlistItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'wishlist-item';
        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="wishlist-item-image">
            <p class="wishlist-item-name">${item.name}</p>
        `;
        wishlistContainer.appendChild(itemDiv);
    });
}

// Get signed-in user from localStorage
function getSignedInUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.signedIn);
}

// Update user information in the DOM
function updateUserInfoInDOM(user) {
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');

    if (userNameElement && userEmailElement) {
        userNameElement.textContent = `${user.firstName} ${user.lastName}`;
        userEmailElement.textContent = user.email;
    } else {
        console.error('User info elements not found in the DOM.');
    }
}

// Display user info on the dashboard
function displayUserInfo() {
    const signedInUser = getSignedInUser();
    if (signedInUser) {
        updateUserInfoInDOM(signedInUser);
    } else {
        alert('No user signed in. Redirecting to login.');
        window.location.href = 'login.html';
    }
}

// Handle edit personal info form fill
function fillPersonalInfoForm(user) {
    const editFirstNameElement = document.getElementById('editFirstName');
    const editLastNameElement = document.getElementById('editLastName');
    const editEmailElement = document.getElementById('editEmail');

    if (editFirstNameElement && editLastNameElement && editEmailElement) {
        editFirstNameElement.value = user.firstName;
        editLastNameElement.value = user.lastName;
        editEmailElement.value = user.email;
    } else {
        console.error('Edit personal info form elements not found in the DOM.');
    }
}

// Save updated user info to localStorage
function saveUpdatedUserInfo(userIndex, users, updatedUser) {
    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Personal information updated successfully.');
}

// Handle edit personal info
document.getElementById('editPersonalInfoBtn')?.addEventListener('click', function () {
    const signedInUser = getSignedInUser();
    if (signedInUser) {
        fillPersonalInfoForm(signedInUser);
        toggleSections('editPersonalInfoSection');
    }
});

// Save edited personal info
document.getElementById('savePersonalInfoBtn')?.addEventListener('click', function () {
    const editFirstName = document.getElementById('editFirstName').value.trim();
    const editLastName = document.getElementById('editLastName').value.trim();
    const editEmail = document.getElementById('editEmail').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const signedInUser = getSignedInUser();

    if (signedInUser) {
        const userIndex = users.findIndex(user => user.email === signedInUser.email);
        if (userIndex !== -1) {
            const updatedUser = { ...signedInUser, firstName: editFirstName, lastName: editLastName, email: editEmail };
            saveUpdatedUserInfo(userIndex, users, updatedUser);

            // Update DOM directly after saving
            updateUserInfoInDOM(updatedUser);
            
            // Hide personal info section after saving
            hideAllSections(); // أو toggleSections('someDefaultSection')
        } else {
            alert('Error: User not found.');
        }
    } else {
        alert('Error: No signed-in user found.');
    }
});

// Save updated password to localStorage
function saveUpdatedPassword(userIndex, users, newPassword) {
    users[userIndex].password = newPassword; // تحديث كلمة المرور
    localStorage.setItem('users', JSON.stringify(users)); // حفظ المستخدمين في localStorage
    alert('Password updated successfully.'); // إظهار رسالة تأكيد
}

// Update password
document.getElementById('updatePasswordBtn')?.addEventListener('click', function () {
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const signedInUser = getSignedInUser();

    if (signedInUser && signedInUser.password === currentPassword) {
        if (newPassword === confirmNewPassword) {
            const userIndex = users.findIndex(user => user.email === signedInUser.email);
            if (userIndex !== -1) {
                saveUpdatedPassword(userIndex, users, newPassword);
                
                // Hide change password section after saving
                hideAllSections(); // أو toggleSections('someDefaultSection')
            } else {
                alert('Error: User not found.');
            }
        } else {
            alert('Passwords do not match.');
        }
    } else {
        alert('Incorrect current password.');
    }
});

// Button to show Change Password section
document.getElementById('changePasswordBtn')?.addEventListener('click', function () {
    toggleSections('changePasswordSection');
});

// Hide all sections after saving or updating
function hideAllSections() {
    const sections = ['editPersonalInfoSection', 'changePasswordSection'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none'; // Hide all sections
        }
    });
}

// Toggle section visibility based on the passed section id
function toggleSections(visibleSectionId) {
    const sections = ['editPersonalInfoSection', 'changePasswordSection'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = sectionId === visibleSectionId ? 'block' : 'none';
        }
    });
}

// Display notifications
const notifications = [
    "Your order #1234 has been shipped!",
    "You have a new message from support.",
    "A new product has been added to your wishlist."
];

function displayNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (notificationsList) {
        notifications.forEach(notification => {
            const li = document.createElement('li');
            li.textContent = notification;
            notificationsList.appendChild(li);
        });
    } else {
        console.error('Notifications list element not found.');
    }
}

// Update avatar in both navbar and dashboard
function updateAvatar(userAvatarSrc) {
    const navUserAvatar = document.getElementById('navUserAvatar');
    const navUserIcon = document.getElementById('navUserIcon');
    const dashboardAvatar = document.getElementById('dashboardAvatar');

    if (navUserAvatar) {
        navUserAvatar.src = userAvatarSrc;
        navUserAvatar.style.display = 'block';
        if (navUserIcon) navUserIcon.style.display = 'none';
    }

    if (dashboardAvatar) {
        dashboardAvatar.src = userAvatarSrc;
    }

    // Save the new avatar to localStorage
    localStorage.setItem('userAvatar', userAvatarSrc);
}

// Load and display the user avatar
function loadAvatar() {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        updateAvatar(savedAvatar);
    }
}

// Load the user activity chart
function loadActivityChart() {
    const ctx = document.getElementById('activityChart')?.getContext('2d');
    if (ctx) {
        const activityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Orders', 'Wishlist', 'Reviews'],
                datasets: [{
                    label: 'User Activity',
                    data: [12, 3, 7], // تأكد من وضع بيانات مناسبة هنا
                    backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        console.error("Activity chart canvas not found.");
    }
}

// تحديث شريط تقدم الملف الشخصي
const profileProgressBar = document.getElementById('profileProgressBar');
if (profileProgressBar) {
    const profileCompletion = 70; // نسبة الإنجاز كمثال
    profileProgressBar.style.width = profileCompletion + '%';
} else {
    console.error('Profile progress bar not found.');
}

// Main function to run on page load
window.onload = function () {
    // Load avatar first
    loadAvatar();

    // Display user information and notifications
    displayUserInfo();
    displayNotifications();

    // Draw the user activity chart
    loadActivityChart();
};

// Avatar change event
document.getElementById('changeAvatarBtn')?.addEventListener('click', function () {
    document.getElementById('avatarUpload').click();
});

// Handle avatar file upload and update
document.getElementById('avatarUpload')?.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updateAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Handle logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // حذف بيانات المستخدم من التخزين المحلي
    localStorage.removeItem('userAvatar'); // إزالة صورة الأفاتار
    localStorage.removeItem('userSession'); // إزالة بيانات الجلسة (استبدل 'userSession' باسم المفتاح المناسب)
    localStorage.removeItem('users'); // إزالة بيانات المستخدمين من التخزين المحلي

    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = 'login.html'; // تغيير هذا إلى رابط صفحة تسجيل الدخول
});
  // مثال لحالة اكتمال الملف الشخصي
  const profileCompletion = 70; // نسبة الإنجاز الحالية (يمكن أن تكون 100 عند الاكتمال)

  // الحصول على عنصر إنجاز "Profile Completed"
  const profileCompletedAchievement = document.querySelector('.achievement-item.profile-completed');
  
  if (profileCompletion === 100) {
      profileCompletedAchievement.classList.add('active');
      profileCompletedAchievement.classList.remove('inactive');
  } else {
      profileCompletedAchievement.classList.add('inactive');
      profileCompletedAchievement.classList.remove('active');
  }



  