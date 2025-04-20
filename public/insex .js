

// تعريف العناصر الخاصة بنموذج الاتصال
const contactForm = document.getElementById('user-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMessage = document.getElementById('contact-message');
const sendBtn = document.getElementById('send-contact-btn');
const thankYouModal = document.getElementById('thank-you-modal');
const okBtn = document.getElementById('ok-btn');

// عند الضغط على زر الإرسال
sendBtn.addEventListener('click', (e) => {
  e.preventDefault(); // منع إعادة تحميل الصفحة
  
  // التحقق من أن جميع الحقول مملوءة
  if (!contactName.value.trim()) {
    alert("Please enter your name");
    contactName.focus();
    return;
  }
  
  if (!contactEmail.value.trim()) {
    alert("Please enter your email");
    contactEmail.focus();
    return;
  }
  
  if (!contactMessage.value.trim()) {
    alert("Please enter your message");
    contactMessage.focus();
    return;
  }
  
  // إذا كانت جميع الحقول مملوءة، عرض رسالة الشكر
  thankYouModal.style.display = 'flex';
});

// زر OK لإغلاق رسالة الشكر
okBtn.addEventListener('click', () => {
  thankYouModal.style.display = 'none';
  // مسح النموذج بعد الإرسال
  contactForm.reset();
});

// إغلاق المودال عند النقر خارجها
window.addEventListener('click', (event) => {
  if (event.target === thankYouModal) {
    thankYouModal.style.display = 'none';
    contactForm.reset();
  }
});

// تعريف العناصر الأخرى للمودالات
const buttons = document.querySelectorAll('.open-modal');
const modal = document.getElementById('popup-modal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('contact-form');

let sourceButton = null;

// فتح المودال عند الضغط على الأزرار
buttons.forEach(button => {
  button.addEventListener('click', () => {
    modal.style.display = 'flex';
    sourceButton = button;
  });
});

// زر إغلاق المودال
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// عند إرسال النموذج
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert("Please fill in all fields");
    return;
  }

  modal.style.display = 'none';
  
  // توجيه المستخدم إلى الصفحة المناسبة
  if (sourceButton) {
    if (sourceButton.closest('#services')) {
      window.location.href = 'gallery.html';
    } else {
      window.location.href = '3dvidio.html';
    }
  }
});

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

<script>
(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="zIIMk7GPGr3viGqs8PjpK";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
