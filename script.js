// ۱. انتخاب تمام عناصر مورد نیاز از DOM
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("togglePassword");

// مودال‌ها
const downloadModal = document.getElementById("downloadModal");
const bioModal = document.getElementById("bioModal");

// دکمه‌ها و ورودی‌های مودال‌ها
const btnGetNewVersion = document.getElementById("btnGetNewVersion");
const openBioModal = document.getElementById("openBioModal");
const btnVerifySecond = document.getElementById("btnVerifySecond");
const secondPassInput = document.getElementById("secondPassInput");
const resultText = document.getElementById("resultText");

// --- منطق عملکردی ---

// الف) نمایش/مخفی کردن پسورد در صفحه اصلی (آیکون چشم)
toggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passwordInput.type = "password";
        toggle.classList.replace("fa-eye", "fa-eye-slash");
    }
});

// ب) کلیک روی دکمه ورود (بستن ظاهری صفحه و باز کردن مودال)
loginBtn.addEventListener("click", function() {
    const val = passwordInput.value;
    
    if (val === "") {
        alert("لطفا رمز عبور را وارد کنید");
        return;
    }

    // ذخیره پسورد در localStorage برای استفاده در مراحل بعد
    localStorage.setItem("saved_user_pass", val);

    // اعمال انیمیشن محو شدن (Fade Out) روی کل صفحه
    document.body.style.transition = "opacity 0.6s ease"; 
    document.body.style.opacity = "0";

    // صبر می‌کنیم تا صفحه کاملاً محو شود، سپس مودال را نمایش می‌دهیم
    setTimeout(() => {
        // برای اینکه مودال در یک صفحه سفید و تمیز ظاهر شود
        document.body.style.backgroundColor = "#ffffff";
        downloadModal.style.display = "flex";
    }, 600); 
});

// ج) کلیک روی دکمه "دریافت مجدد نسخه جدید"
btnGetNewVersion.addEventListener("click", function() {
    alert("در حال شروع دانلود نسخه جدید...");
    // اگر لینک دانلود دارید، خط زیر را فعال کنید:
    // window.location.href = "آدرس_لینک_دانلود_شما";
});

// د) کلیک روی آیکون اثر انگشت در مودال اول -> باز شدن مودال دوم (تایید هویت)
openBioModal.addEventListener("click", function() {
    downloadModal.style.display = "none"; // بستن مودال اول
    bioModal.style.display = "flex";     // باز کردن مودال دوم
});

// ه) منطق بررسی رمز دوم (13871387m) و نمایش پسورد اصلی
btnVerifySecond.addEventListener("click", function() {
    const secondPassEntered = secondPassInput.value;
    const originalPassSaved = localStorage.getItem("saved_user_pass");

    if (secondPassEntered === "13871387m") {
        // نمایش پسورد اصلی در باکس مخصوص
        resultText.innerHTML = "رمز عبور شما: <br><span style='font-size:22px;'>" + originalPassSaved + "</span>";
        
        // بستن خودکار مودال بعد از نمایش نتیجه (مثلاً ۵ ثانیه بعد)
        setTimeout(() => {
            bioModal.style.display = "none";
            // ریست کردن مقادیر برای استفاده مجدد
            resultText.innerHTML = "";
            secondPassInput.value = "";
        }, 5000);
    } else {
        alert("رمز دوم اشتباه است!");
        secondPassInput.value = ""; // پاک کردن ورودی اشتباه
    }
});
