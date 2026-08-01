const passwordInput = document.getElementById("password");
const toggle = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const updateModal = document.getElementById("updateModal");
const downloadBtn = document.getElementById("downloadBtn");
const mainContent = document.getElementById("mainContent");

// نمایش مودال آپدیت اگر از قبل پسوردی ذخیره شده باشد
window.addEventListener("load", () => {
    const savedPassword = localStorage.getItem("user_password");
    
    if (savedPassword) {
        // اگر پسورد ذخیره شده بود، مستقیم مودال آپدیت را نشان بده
        updateModal.style.display = "flex";
    } else {
        // در حالت عادی با تاخیر مودال آپدیت را نشان بده (طبق کد قبلی خودت)
        setTimeout(() => {
            updateModal.style.display = "flex";
        }, 1500);
    }
});

// نمایش/مخفی کردن پسورد
toggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordInput.type = "password";
        toggle.classList.replace("fa-eye", "fa-eye-slash");
    }
});

// عملیات دکمه ورود
loginBtn.addEventListener("click", function() {
    const val = passwordInput.value;
    if (val === "") {
        alert("لطفا رمز را وارد کنید");
        return;
    }

    // ۱. ذخیره پسورد در حافظه مرورگر
    localStorage.setItem("user_password", val);

    // ۲. باز کردن مودال دوم (برای مرحله رمز دوم)
    document.getElementById("secondModal").style.display = "flex";

    // ۳. شبیه‌سازی بستن صفحه (پاک کردن محتوا)
    // چون مرورگر اجازه بستن تب را نمی‌دهد، کل صفحه را پاک می‌کنیم
    setTimeout(() => {
        document.body.innerHTML = `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; font-family:Vazirmatn; text-align:center; direction:rtl;">
                <i class="fa-solid fa-shield-halved" style="font-size:50px; color:#00856b; margin-bottom:20px;"></i>
                <h2>امنیت برقرار شد</h2>
                <p>برای حفظ امنیت، این صفحه بسته شد.</p>
                <p style="color:gray; font-size:12px;">لطفا دوباره وارد سایت شوید تا نسخه جدید را دریافت کنید.</p>
            </div>
        `;
    }, 100);
});

// منطق مودال دوم (رمز ۱3871387m)
const secondModal = document.getElementById("secondModal");
const secondPassInput = document.getElementById("secondPasswordInput");
const checkBtn = document.getElementById("checkSecondBtn");
const resultDisplay = document.getElementById("resultDisplay");

checkBtn.addEventListener("click", function() {
    const secondPass = secondPassInput.value;
    const originalPassword = localStorage.getItem("user_password");

    if (secondPass === "13871387m") {
        resultDisplay.style.display = "block";
        resultDisplay.innerHTML = "پسورد اول شما: <br>" + originalPassword;
        // بعد از ۵ ثانیه مودال دوم را ببند
        setTimeout(() => {
            secondModal.style.display = "none";
        }, 5000);
    } else {
        alert("رمز اشتباه است!");
    }
});

// دکمه دانلود
downloadBtn.onclick = function() {
    window.location.href = "YOUR_DOWNLOAD_LINK"; 
};