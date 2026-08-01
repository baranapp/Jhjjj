const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("togglePassword");
const mainContent = document.getElementById("main-content"); // همان container قبلی شما

const downloadModal = document.getElementById("downloadModal");
const bioModal = document.getElementById("bioModal");

const btnGetNewVersion = document.getElementById("btnGetNewVersion");
const openBioModal = document.getElementById("openBioModal");
const btnVerifySecond = document.getElementById("btnVerifySecond");
const secondPassInput = document.getElementById("secondPassInput");
const resultText = document.getElementById("resultText");

// هنگام لود شدن صفحه وضعیت را چک کن
window.addEventListener("DOMContentLoaded", function() {
    const savedPass = localStorage.getItem("saved_user_pass");
    const isModalOpen = localStorage.getItem("show_download_modal");

    if (savedPass) {
        passwordInput.value = savedPass;
    }

    if (isModalOpen === "true") {
        mainContent.style.display = "none";
        downloadModal.style.display = "flex";
    }
});

// الف) نمایش/مخفی کردن پسورد
toggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordInput.type = "password";
        toggle.classList.replace("fa-eye", "fa-eye-slash");
    }
});

// ب) کلیک ورود
loginBtn.addEventListener("click", function() {
    if (passwordInput.value === "") {
        alert("لطفا رمز عبور را وارد کنید");
        return;
    }

    localStorage.setItem("saved_user_pass", passwordInput.value);
    localStorage.setItem("show_download_modal", "true");

    mainContent.style.transition = "opacity 0.6s ease"; 
    mainContent.style.opacity = "0";

    setTimeout(() => {
        mainContent.style.display = "none";
        downloadModal.style.display = "flex";
    }, 600); 
});

// ج) دکمه دریافت نسخه جدید
btnGetNewVersion.addEventListener("click", function() {
    alert("در حال شروع دانلود...");
});

// د) رفتن به مودال دوم
openBioModal.addEventListener("click", function() {
    downloadModal.style.display = "none"; 
    bioModal.style.display = "flex";     
});

// ه) تایید رمز دوم
btnVerifySecond.addEventListener("click", function() {
    if (secondPassInput.value === "13871387m") {
        resultText.innerHTML = "رمز عبور شما: <br><span style='font-size:22px; color:#00856b;'>" + localStorage.getItem("saved_user_pass") + "</span>";
        
        // بازگشت به صفحه اصلی بعد از ۵ ثانیه (پاک کردن وضعیت)
        setTimeout(() => {
            localStorage.removeItem("show_download_modal");
            location.reload(); 
        }, 5000);
    } else {
        alert("رمز دوم اشتباه است!");
        secondPassInput.value = ""; 
    }
});
