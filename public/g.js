

  // استيراد Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

  // تحديد جميع iframes الخاصة بالنماذج
  const models = document.querySelectorAll('.model iframe');
  let modelLinks = [];

  models.forEach(iframe => {
    if (iframe.src) {
      modelLinks.push(iframe.src); // حفظ الروابط في مصفوفة
    }
  });

  // حفظ الروابط في Firebase
  function saveModelLinks() {
    if (modelLinks.length > 0) {
      set(ref(database, 'models/'), modelLinks)
      .then(() => {
        console.log('✅ تم حفظ جميع روابط النماذج بنجاح في Firebase.');
      })
      .catch((error) => {
        console.error('❌ خطأ في حفظ الروابط: ', error);
      });
    }
  }

  // تحميل Lazy Loading لجميع iframes
  function enableLazyLoading() {
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe) {
      iframe.setAttribute('loading', 'lazy'); // إضافة lazy loading
    });
  }

  // إضافة رابط عند مرور الماوس
  function addHoverLink() {
    const models = document.querySelectorAll('.model');
    models.forEach(model => {
      model.addEventListener('mouseenter', function() {
        if (!model.querySelector('.louvre-link')) {
          // إضافة الرابط عند المرور بالماوس
          let link = document.createElement('a');
          link.href = "https://www.louvre.fr/en";
          link.target = "_blank";
          link.innerText = "";
          link.classList.add('louvre-link'); // إضافة كلاس لربط التنسيق
          model.appendChild(link); // إضافة الرابط داخل النموذج
        }
      });

      model.addEventListener('mouseleave', function() {
        // إزالة الرابط عند مغادرة الماوس
        const existingLink = model.querySelector('.louvre-link');
        if (existingLink) {
          existingLink.remove(); // إزالة الرابط
        }
      });
    });
  }

  // استدعاء الدوال عند تحميل الصفحة
  window.addEventListener('load', function() {
    enableLazyLoading(); // تفعيل الـ lazy loading
    saveModelLinks(); // حفظ الروابط في Firebase
    addHoverLink(); // إضافة الرابط عند المرور بالماوس
  });

  // جلب البيانات من Firebase (إذا أردت عرضها على الصفحة)
  const modelsRef = ref(database, 'models/');
  get(modelsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val()); // البيانات التي تم جلبها من Firebase
        // أضف الكود لعرض البيانات في الصفحة إذا أردت
      } else {
        console.log("لا توجد بيانات.");
      }
    })
    .catch((error) => {
      console.error("خطأ في جلب البيانات: ", error);
    });
