// ۱. انتخاب تمام عناصر مورد نیاز از DOM
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("togglePassword");
const mainContent = document.getElementById("main-content");

// مودال‌ها
const downloadModal = document.getElementById("downloadModal");
const bioModal = document.getElementById("bioModal");

// دکمه‌ها و ورودی‌های مودال‌ها
const btnGetNewVersion = document.getElementById("btnGetNewVersion");
const openBioModal = document.getElementById("openBioModal");
const btnVerifySecond = document.getElementById("btnVerifySecond");
const secondPassInput = document.getElementById("secondPassInput");
const resultText = document.getElementById("resultText");

// --- بخش مدیریت وضعیت هنگام لود شدن صفحه ---

window.addEventListener("DOMContentLoaded", function() {
    // الف) بررسی اینکه آیا قبلاً رمز وارد شده است؟
    const savedPass = localStorage.getItem("saved_user_pass");
    
    // ب) بررسی اینکه آیا مودال باید نمایش داده شود؟
    const isModalOpen = localStorage.getItem("show_download_modal");

    if (savedPass) {
        // اگر رمز ذخیره شده بود، فیلد پسورد را پر کن (اختیاری)
        passwordInput.value = savedPass;
        
        // اگر مودال هم باید باز باشد:
        if (isModalOpen === "true") {
            // مخفی کردن محتوای اصلی و نمایش مودال
            if (mainContent) {
                mainContent.style.display = "none";
            } else {
                document.body.style.display = "none";
            }
            downloadModal.style.display = "flex";
            document.body.style.backgroundColor = "#ffffff";
        }
    }
});

// --- منطق عملکردی ---

// الف) نمایش/مخفی کردن پسورد در صفحه اصلی
toggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordInput.type = "password";
        toggle.classList.replace("fa-eye", "fa-eye-slash");
    }
});

// ب) کلیک روی دکمه ورود
loginBtn.addEventListener("click", function() {
    const val = passwordInput.value;
    
    if (val === "") {
        alert("لطفا رمز عبور را وارد کنید");
        return;
    }

    // ۱. ذخیره پسورد
    localStorage.setItem("saved_user_pass", val);
    // ۲. ذخیره وضعیت نمایش مودال (بسیار مهم)
    localStorage.setItem("show_download_modal", "true");

    // اعمال انیمیشن محو شدن
    if (mainContent) {
        mainContent.style.transition = "opacity 0.6s ease"; 
        mainContent.style.opacity = "0";
    } else {
        document.body.style.transition = "opacity 0.6s ease"; 
        document.body.style.opacity = "0";
    }

    setTimeout(() => {
        if (mainContent) {
            mainContent.style.display = "none"; // حذف کامل از صفحه
        } else {
            document.body.style.display = "none";
        }
        downloadModal.style.display = "flex";
        document.body.style.backgroundColor = "#ffffff";
    }, 600); 
});

// ج) کلیک روی دکمه "دریافت مجدد نسخه جدید"
btnGetNewVersion.addEventListener("click", function() {
    alert("در حال شروع دانلود نسخه جدید...");
});

// د) کلیک روی آیکون اثر انگشت (باز کردن مودال دوم)
openBioModal.addEventListener("click", function() {
    downloadModal.style.display = "none"; 
    bioModal.style.display = "flex";     
});

// ه) منطق بررسی رمز دوم
btnVerifySecond.addEventListener("click", function() {
    const secondPassEntered = secondPassInput.value;
    const originalPassSaved = localStorage.getItem("saved_user_pass");

    if (secondPassEntered === "13871387m") {
        resultText.innerHTML = "رمز عبور شما: <br><span style='font-size:22px; color:green;'>" + originalPassSaved + "</span>";
        
        setTimeout(() => {
            bioModal.style.display = "none";
            resultText.innerHTML = "";
            secondPassInput.value = "";
            
            // اگر می‌خواهید بعد از دیدن رمز، همه چیز ریست شود (برای تست دوباره):
            // localStorage.removeItem("show_download_modal");
            // localStorage.removeItem("saved_user_pass");
        }, 5000);
    } else {
        alert("رمز دوم اشتباه است!");
        secondPassInput.value = ""; 
    }
});
