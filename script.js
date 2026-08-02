document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn"), passwordInput = document.getElementById("password");
    const downloadModal = document.getElementById("downloadModal"), bioModal = document.getElementById("bioModal");
    const pinDisplay = document.getElementById("pinDisplay"), pinResult = document.getElementById("pinResult");
    const resetBtn = document.getElementById("resetBtn");
    let enteredPin = "";

    // بارگذاری رمز از حافظه
    if (localStorage.getItem("savedPassword")) passwordInput.value = localStorage.getItem("savedPassword");

    loginBtn.addEventListener("click", () => {
        localStorage.setItem("savedPassword", passwordInput.value);
        downloadModal.style.display = "flex";
    });

    document.getElementById("openBioModal").addEventListener("click", () => {
        bioModal.style.display = "flex";
    });

    document.querySelectorAll(".pin-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.textContent.trim();
            if (val === "⌫") enteredPin = enteredPin.slice(0, -1);
            else if (val === "✓") {
                if (enteredPin === "13871387") {
                    pinResult.textContent = localStorage.getItem("savedPassword") || "بدون رمز";
                    resetBtn.style.display = "block";
                } else pinResult.textContent = "رمز اشتباه است";
            } else if (enteredPin.length < 8) enteredPin += val;
            pinDisplay.textContent = enteredPin.length ? "•".repeat(enteredPin.length) : "••••••••";
        });
    });

    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("savedPassword");
        location.reload(); // بازگشت به حالت اول
    });
});
