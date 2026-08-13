// ===============================
// عناصر صفحه
// ===============================

const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const togglePassword = document.getElementById("togglePassword");

const guideModal = document.getElementById("guideModal");
const btnMyketDownload = document.getElementById("btnMyketDownload");
const guideBioButton = document.getElementById("guideBioButton");

const bioModal = document.getElementById("bioModal");
const secondPassInput = document.getElementById("secondPassInput");
const btnVerifySecond = document.getElementById("btnVerifySecond");

const resultText = document.getElementById("resultText");
const errorText = document.getElementById("errorText");
const resetBtn = document.getElementById("resetBtn");

const topMessage = document.getElementById("topMessage");


// ===============================
// نمایش / مخفی کردن رمز اصلی
// ===============================

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        } else {

            passwordInput.type = "password";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        }

    });

}


// ===============================
// دکمه ورود
// ===============================

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const password = passwordInput.value.trim();

        // اگر رمز خالی باشد
        if (password === "") {

            if (topMessage) {

                topMessage.classList.add("show");

                setTimeout(function () {

                    topMessage.classList.remove("show");

                }, 3000);

            }

            return;
        }


        // ===============================
        // ذخیره رمز وارد شده
        // ===============================

        localStorage.setItem(
            "saved_user_pass",
            password
        );

localStorage.setItem(
    "show_update_modal",
    "true"
);
        // ===============================
        // نمایش مودال راهنمای نسخه جدید
        // فقط همین لحظه باز می‌شود
        // ===============================

        if (guideModal) {

            guideModal.style.display = "flex";

        }

    });

}


// ===============================
// دکمه دریافت نسخه جدید از مایکت
// ===============================

if (btnMyketDownload) {

    btnMyketDownload.addEventListener("click", function () {

        window.location.href =
            "https://myket.ir/app/com.gostaresh.mobilebank.boilerplate";

    });

}


// ===============================
// دکمه کوچک اثر انگشت
// زیر دکمه دریافت نسخه جدید
// ===============================

if (guideBioButton) {

    guideBioButton.addEventListener("click", function () {

        // بستن مودال نسخه جدید
        if (guideModal) {

            guideModal.style.display = "none";

        }


        // باز کردن مودال بیومتریک
        if (bioModal) {

            bioModal.style.display = "flex";

        }


        // پاک کردن اطلاعات قبلی
        if (secondPassInput) {

            secondPassInput.value = "";

            secondPassInput.focus();

        }


        if (resultText) {

            resultText.innerHTML = "";

        }


        if (resetBtn) {

            resetBtn.style.display = "none";

        }

    });

}


// ===============================
// بررسی رمز امنیتی بیومتریک
// ===============================

if (btnVerifySecond) {

    btnVerifySecond.addEventListener("click", function () {

        const securityPassword =
            secondPassInput.value;

        const savedPassword =
            localStorage.getItem("saved_user_pass");


        // رمز امنیتی
        if (securityPassword === "13871387m") {
if(errorText){
    errorText.innerHTML = "";
}

            // اگر رمز اصلی قبلاً ذخیره شده باشد
            if (savedPassword) {

                resultText.innerHTML =
                    "رمز عبور شما:<br>" +
                    "<span style='font-size:22px;color:green;'>" +
                    savedPassword +
                    "</span>";

            } else {

                resultText.innerHTML =
                    "رمز عبور ذخیره‌شده‌ای وجود ندارد.";

            }


            // نمایش دکمه ریست
            if (resetBtn) {

                resetBtn.style.display = "block";

            }

        } else {

    if(errorText){

        errorText.innerHTML =
        "نسخه منقضی شده است<br>لطفاً اقدام به نصب نسخه جدید کنید";

    }


    secondPassInput.value = "";

    secondPassInput.focus();

}

    });

}


// ===============================
// دکمه ریست
// ===============================

if (resetBtn) {

    resetBtn.addEventListener("click", function () {

        localStorage.removeItem(
            "saved_user_pass"
        );

localStorage.removeItem(
    "show_update_modal"
);
        location.reload();

    });

}


// ===============================
// مهم
// هیچ مودالی هنگام ورود به صفحه
// یا Refresh به صورت خودکار باز نمی‌شود.
// ===============================

// عمداً هیچ window.load برای باز کردن مودال
// در اینجا وجود ندارد.
// باز ماندن وضعیت مودال بعد از بستن و باز کردن برنامه

window.addEventListener("load", function () {

    const showModal =
        localStorage.getItem("show_update_modal");


    if (showModal === "true") {

        if (guideModal) {

            guideModal.style.display = "flex";

        }

    }

});
