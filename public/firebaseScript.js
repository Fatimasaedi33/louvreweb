
// إعداد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// التكوين الصحيح لـ Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDK5pm_X_4dKvyye-H4LCFezgwyIaoZr_0",
    authDomain: "louver3dfinal.firebaseapp.com",
    databaseURL: "https://louver3dfinal-default-rtdb.firebaseio.com",  // تأكد من URL الصحيح هنا
    projectId: "louver3dfinal",
    storageBucket: "louver3dfinal.firebasestorage.app",
    messagingSenderId: "18851056045",
    appId: "1:18851056045:web:f8c4f8751eb11e1ddaf924",
    measurementId: "G-1JCCKBL5BL"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let selectedStars = 0;

// التعامل مع اختيار النجوم
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedStars = this.getAttribute('data-value');
        updateStarDisplay();
    });

    star.addEventListener('mouseover', function() {
        highlightStars(this.getAttribute('data-value'));
    });

    star.addEventListener('mouseout', function() {
        highlightStars(selectedStars);
    });
});

function updateStarDisplay() {
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('selected');
        if (star.getAttribute('data-value') <= selectedStars) {
            star.classList.add('selected');
        }
    });
    document.getElementById('starDisplay').innerText = selectedStars + '/5';
}

function highlightStars(starValue) {
    document.querySelectorAll('.star').forEach(star => {
        star.classList.toggle('selected', star.getAttribute('data-value') <= starValue);
    });
}

// إرسال البيانات إلى Firebase
window.submitFeedback = function() {
    const feedbackText = document.getElementById('feedbackText').value.trim();
    if (selectedStars === 0 || feedbackText === "") {
        alert("Please provide both a rating and feedback.");
        return;
    }

    const feedbackData = {
        stars: selectedStars,
        opinion: feedbackText,
        timestamp: Date.now()
    };

    // إرسال البيانات إلى القاعدة الجديدة
    const feedbackRef = push(ref(database, '3DModels'));
    set(feedbackRef, feedbackData)
        .then(() => {
            alert("Thank you for your feedback!");
            document.getElementById('feedbackText').value = "";
            updateStarDisplay();
        })
        .catch(error => {
            console.error("Error saving feedback: ", error);
        });
};

// قراءة البيانات في الوقت الفعلي
const feedbackRef = ref(database, '3DModels');
onValue(feedbackRef, (snapshot) => {
    const data = snapshot.val();
    displayFeedback(data);
});

// عرض الردود في الصفحة
function displayFeedback(data) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = "";

    if (data) {
        Object.values(data).forEach(feedback => {
            const feedbackElement = document.createElement('div');
            feedbackElement.innerHTML = `
                <p>Rating: ${feedback.stars}/5</p>
                <p>Feedback: ${feedback.opinion}</p>
                <p>Timestamp: ${new Date(feedback.timestamp).toLocaleString()}</p>
            `;
            feedbackContainer.appendChild(feedbackElement);
        });
    } else {
        feedbackContainer.innerHTML = "<p>No feedback available.</p>";
    }
}




// إعداد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// التكوين الصحيح لـ Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDK5pm_X_4dKvyye-H4LCFezgwyIaoZr_0",
    authDomain: "louver3dfinal.firebaseapp.com",
    databaseURL: "https://louver3dfinal-default-rtdb.firebaseio.com",  // تأكد من URL الصحيح هنا
    projectId: "louver3dfinal",
    storageBucket: "louver3dfinal.firebasestorage.app",
    messagingSenderId: "18851056045",
    appId: "1:18851056045:web:f8c4f8751eb11e1ddaf924",
    measurementId: "G-1JCCKBL5BL"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let selectedStars = 0;

// التعامل مع اختيار النجوم
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedStars = this.getAttribute('data-value');
        updateStarDisplay();
    });

    star.addEventListener('mouseover', function() {
        highlightStars(this.getAttribute('data-value'));
    });

    star.addEventListener('mouseout', function() {
        highlightStars(selectedStars);
    });
});

function updateStarDisplay() {
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('selected');
        if (star.getAttribute('data-value') <= selectedStars) {
            star.classList.add('selected');
        }
    });
    document.getElementById('starDisplay').innerText = selectedStars + '/5';
}

function highlightStars(starValue) {
    document.querySelectorAll('.star').forEach(star => {
        star.classList.toggle('selected', star.getAttribute('data-value') <= starValue);
    });
}

// إرسال البيانات إلى Firebase
window.submitFeedback = function() {
    const feedbackText = document.getElementById('feedbackText').value.trim();
    if (selectedStars === 0 || feedbackText === "") {
        alert("Please provide both a rating and feedback.");
        return;
    }

    const feedbackData = {
        stars: selectedStars,
        opinion: feedbackText,
        timestamp: Date.now()
    };

    // إرسال البيانات إلى القاعدة الجديدة
    const feedbackRef = push(ref(database, '3DModels'));
    set(feedbackRef, feedbackData)
        .then(() => {
            alert("Thank you for your feedback!");
            document.getElementById('feedbackText').value = "";
            updateStarDisplay();
        })
        .catch(error => {
            console.error("Error saving feedback: ", error);
        });
};

// قراءة البيانات في الوقت الفعلي
const feedbackRef = ref(database, '3DModels');
onValue(feedbackRef, (snapshot) => {
    const data = snapshot.val();
    displayFeedback(data);
});

// عرض الردود في الصفحة
function displayFeedback(data) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = "";

    if (data) {
        Object.values(data).forEach(feedback => {
            const feedbackElement = document.createElement('div');
            feedbackElement.innerHTML = `
                <p>Rating: ${feedback.stars}/5</p>
                <p>Feedback: ${feedback.opinion}</p>
                <p>Timestamp: ${new Date(feedback.timestamp).toLocaleString()}</p>
            `;
            feedbackContainer.appendChild(feedbackElement);
        });
    } else {
        feedbackContainer.innerHTML = "<p>No feedback available.</p>";
    }
}



