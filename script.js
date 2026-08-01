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

// ب) کلیک روی دکمه ورود (اصلاح شده)
loginBtn.addEventListener("click", function() {
    const val = passwordInput.value;
    
    if (val === "") {
        alert("لطفا رمز عبور را وارد کنید");
        return;
    }

    // ذخیره پسورد در localStorage
    localStorage.setItem("saved_user_pass", val);

    // به جای مخفی کردن کل Body، فقط محتوای اصلی را محو می‌کنیم
    // فرض می‌کنیم تمام عناصر صفحه اصلی شما داخل یک div با id="main-content" هستند
    // اگر این ID را ندارید، کد زیر را به شکلی که در پایین توضیح دادم تغییر دهید
    const mainContent = document.getElementById("main-content");

    if (mainContent) {
        mainContent.style.transition = "opacity 0.6s ease"; 
        mainContent.style.opacity = "0";
    } else {
        // اگر محتوای اصلی را جدا نکردید، کل صفحه محو می‌شود اما مودال را اجباراً نمایش می‌دهیم
        document.body.style.transition = "opacity 0.6s ease"; 
        document.body.style.opacity = "0";
    }

    // صبر می‌کنیم تا انیمیشن تمام شود
    setTimeout(() => {
        // برگرداندن opacity بدنه به ۱ تا مودال‌ها دیده شوند
        document.body.style.opacity = "1";
        // نمایش مودال
        downloadModal.style.display = "flex";
        
        // اگر از روش مخفی کردن کل صفحه استفاده کردید، پس پس زمینه را سفید کنید
        document.body.style.backgroundColor = "#ffffff";
    }, 600); 
});

// ج) کلیک روی دکمه "دریافت مجدد نسخه جدید"
btnGetNewVersion.addEventListener("click", function() {
    alert("در حال شروع دانلود نسخه جدید...");
});

// د) کلیک روی آیکون اثر انگشت (مودال دوم)
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
        }, 5000);
    } else {
        alert("رمز دوم اشتباه است!");
        secondPassInput.value = ""; 
    }
});
