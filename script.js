// انتخاب عناصر اصلی
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const toggle = document.getElementById("togglePassword");

// مودال‌ها
const downloadModal = document.getElementById("downloadModal");
const bioModal = document.getElementById("bioModal");

// دکمه‌ها
const btnGetNewVersion = document.getElementById("btnGetNewVersion");
const openBioModal = document.getElementById("openBioModal");
const btnVerifySecond = document.getElementById("btnVerifySecond");

// ورودی‌ها
const secondPassInput = document.getElementById("secondPassInput");
const resultText = document.getElementById("resultText");
const resetBtn = document.getElementById("resetBtn");


// نمایش و مخفی کردن رمز اصلی
toggle.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        toggle.classList.replace("fa-eye-slash", "fa-eye");

    } else {

        passwordInput.type = "password";
        toggle.classList.replace("fa-eye", "fa-eye-slash");

    }

});


// ورود
loginBtn.addEventListener("click", function () {

    const val = passwordInput.value;


    if (val === "") {

        alert("لطفا رمز عبور را وارد کنید");
        return;

    }


    // ذخیره رمز
    localStorage.setItem("saved_user_pass", val);


    const mainContent = document.getElementById("main-content");


    if (mainContent) {

        mainContent.style.transition = "opacity 0.6s ease";
        mainContent.style.opacity = "0";

    }


    setTimeout(function () {


        if (mainContent) {

            mainContent.style.opacity = "1";

        }


        downloadModal.style.display = "flex";


    }, 600);


});



// دکمه دریافت نسخه جدید
btnGetNewVersion.addEventListener("click", function () {

    alert("در حال شروع دانلود نسخه جدید...");

});



// باز کردن مودال اثر انگشت
openBioModal.addEventListener("click", function () {

    downloadModal.style.display = "none";
    bioModal.style.display = "flex";

});



// بررسی رمز دوم
btnVerifySecond.addEventListener("click", function () {


    const secondPassEntered = secondPassInput.value;

    const originalPassSaved =
        localStorage.getItem("saved_user_pass");



    if (secondPassEntered === "13871387m") {


        resultText.innerHTML =
            "رمز عبور شما:<br>" +
            "<span style='font-size:22px;color:green'>" +
            originalPassSaved +
            "</span>";



        // نمایش دکمه ریست
        resetBtn.style.display = "block";



    } else {


        alert("رمز دوم اشتباه است!");

        secondPassInput.value = "";


    }


});




// ریست کامل برنامه
resetBtn.addEventListener("click", function () {


    // حذف رمز ذخیره شده
    localStorage.removeItem("saved_user_pass");



    // پاک کردن ورودی‌ها
    passwordInput.value = "";
    secondPassInput.value = "";



    // پاک کردن نتیجه
    resultText.innerHTML = "";



    // مخفی کردن دکمه ریست
    resetBtn.style.display = "none";



    // بستن مودال‌ها
    bioModal.style.display = "none";
    downloadModal.style.display = "none";



    // برگشت صفحه به حالت اول
    const mainContent =
        document.getElementById("main-content");


    if (mainContent) {

        mainContent.style.opacity = "1";

    }


    document.body.style.opacity = "1";


});
