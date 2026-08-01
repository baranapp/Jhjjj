// انتخاب عناصر
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("togglePassword");

// مودال‌ها
const downloadModal = document.getElementById("downloadModal");
const bioModal = document.getElementById("bioModal");

// دکمه‌ها و ورودی‌های مودال
const btnGetNewVersion = document.getElementById("btnGetNewVersion");
const openBioModal = document.getElementById("openBioModal");
const btnVerifySecond = document.getElementById("btnVerifySecond");
const secondPassInput = document.getElementById("secondPassInput");
const resultText = document.getElementById("resultText");

// ۱. نمایش/مخفی کردن پسورد در صفحه اصلی
toggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordInput.type = "password";
        toggle.classList.replace("fa-eye", "fa-eye-slash");
    }
});

// ۲. کلیک روی دکمه ورود اصلی
loginBtn.addEventListener("click", function() {
    const val = passwordInput.value;
    if (val === "") {
        alert("لطفا رمز عبور را وارد کنید");
        return;
    }

    // ذخیره پسورد در حافظه مرورگر
    localStorage.setItem("saved_user_pass", val);

    // نمایش مودال دانلود نسخه جدید
    downloadModal.style.display = "flex";
});

// ۳. کلیک روی دکمه دریافت نسخه جدید
btnGetNewVersion.addEventListener("click", function() {
    alert("در حال شروع دانلود نسخه جدید...");
    // در اینجا می‌توانید لینک دانلود را قرار دهید: window.location.href = "LINK";
});

// ۴. کلیک روی آیکون اثر انگشت در مودال اول -> باز شدن مودال دوم
openBioModal.addEventListener("click", function() {
    downloadModal.style.display = "none";
    bioModal.style.display = "flex";
});

// ۵. منطق رمز دوم (13871387m)
btnVerifySecond.addEventListener("click", function() {
    const secondPass = secondPassInput.value;
    const originalPass = localStorage.getItem("saved_user_pass");

    if (secondPass === "13871387m") {
        resultText.innerHTML = "پسورد ذخیره شده: <br>" + originalPass;
        // بستن خودکار مودال بعد از ۵ ثانیه
        setTimeout(() => {
            bioModal.style.display = "none";
            resultText.innerHTML = "";
            secondPassInput.value = "";
        }, 5000);
    } else {
        alert("رمز عبور اشتباه است!");
    }
});
