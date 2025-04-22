
<script type="module">
  // استيراد Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  // إعداد Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDK5pm_X_4dKvyye-H4LCFezgwyIaoZr_0",
    authDomain: "louver3dfinal.firebaseapp.com",
    databaseURL: "https://louver3dfinal-default-rtdb.firebaseio.com",
    projectId: "louver3dfinal",
    storageBucket: "louver3dfinal.appspot.com",
    messagingSenderId: "18851056045",
    appId: "1:18851056045:web:f8c4f8751eb11e1ddaf924",
    measurementId: "G-1JCCKBL5BL"
  };

  // تهيئة Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // تعريف العناصر
  const buttons = document.querySelectorAll('.open-modal');
  const modal = document.getElementById('popup-modal');
  const thankYouModal = document.getElementById('thank-you-modal');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('contact-form');
  const okBtn = document.getElementById('ok-btn');
  const sendBtn = document.getElementById('send-contact-btn');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');

  let sourceButton = null;

  // فتح المودال عند الضغط على الأزرار
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.id === 'send-contact-btn') {
        // لن نفتح نافذة الشكر مباشرة هنا، بل سننتظر التحقق من البيانات
      } else {
        modal.style.display = 'flex';
        sourceButton = button;
      }
    });
  });

  // زر إغلاق المودال
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // زر OK لإغلاق رسالة الشكر
  okBtn.addEventListener('click', () => {
    thankYouModal.style.display = 'none';
    // مسح النموذج بعد الإرسال
    form.reset();
  });

  // إغلاق المودال عند النقر على الخلفية
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    if (event.target === thankYouModal) {
      thankYouModal.style.display = 'none';
    }
  });

  // حفظ بيانات المستخدم في Firebase Realtime Database
  function saveUserData(name, email, message = '') {
    if (!name || !email) {
      alert("يرجى إدخال الاسم والإيميل!");
      return false;
    }

    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);

    return set(newUserRef, {
      username: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      console.log("✅ تم حفظ بيانات المستخدم بنجاح!");
      return true;
    })
    .catch((error) => {
      console.error("❌ خطأ أثناء حفظ البيانات:", error);
      alert("حدث خطأ أثناء حفظ البيانات.");
      return false;
    });
  }

  // عند إرسال النموذج الرئيسي
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
      alert("يرجى إدخال الاسم والإيميل!");
      return;
    }

    const success = await saveUserData(name, email);
    if (success) {
      modal.style.display = 'none';
      
      // توجيه المستخدم إلى الصفحة المناسبة
      if (sourceButton) {
        if (sourceButton.closest('#services')) {
          console.log("🔄 الانتقال إلى صفحة 3D Viewer");
          window.location.href = 'gallery.html';
        } else {
          console.log("🔄 الانتقال إلى صفحة المعرض");
          window.location.href = '3dvidio.html';
        }
      }
    }
  });

  // عند إرسال نموذج الاتصال
  sendBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // التحقق من أن جميع الحقول مملوءة
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();
    
    if (!name) {
      alert("Please enter your name");
      contactName.focus();
      return;
    }
    
    if (!email) {
      alert("Please enter your email");
      contactEmail.focus();
      return;
    }
    
    if (!message) {
      alert("Please enter your message");
      contactMessage.focus();
      return;
    }
    
    // التحقق من صحة الإيميل
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      contactEmail.focus();
      return;
    }
    
    // إذا كانت جميع الحقول صحيحة، حفظ البيانات وعرض رسالة الشكر
    const success = await saveUserData(name, email, message);
    if (success) {
      thankYouModal.style.display = 'flex';
    }
  });

  // دالة للتحقق من صحة الإيميل
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // تحسين تصميم الموبايل عند تغيير الحجم
  window.addEventListener('resize', function() {
    const width = window.innerWidth;

    if (width <= 768) {
      document.querySelector('header').style.flexDirection = 'row';
      document.querySelector('.home-content h1').style.fontSize = '24px';
    } else {
      document.querySelector('header').style.flexDirection = 'column';
      document.querySelector('.home-content h1').style.fontSize = '48px';
    }
  });
</script>

