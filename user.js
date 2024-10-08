window.onload = function () {
    // استرجاع الأفاتار من localStorage
    const savedAvatar = localStorage.getItem('userAvatar');
    const navUserAvatar = document.getElementById('navUserAvatar');
    const navUserIcon = document.getElementById('navUserIcon');

    if (savedAvatar) {
        // تعيين الأفاتار في شريط التنقل
        if (navUserAvatar) {
            navUserAvatar.src = savedAvatar; // تعيين صورة الأفاتار
            navUserAvatar.style.display = 'block'; // عرض الأفاتار
        }
        // إخفاء أيقونة الضيف
        if (navUserIcon) {
            navUserIcon.style.display = 'none'; // إخفاء الأيقونة
        }
    } else {
        // إذا لم يكن هناك صورة أفاتار، عرض أيقونة الضيف
        if (navUserIcon) {
            navUserIcon.style.display = 'block'; // عرض أيقونة الضيف
        }
        if (navUserAvatar) {
            navUserAvatar.style.display = 'none'; // إخفاء صورة الأفاتار
        }
    }

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
};
