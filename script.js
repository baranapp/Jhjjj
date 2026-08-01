const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");

    } else {

        password.type = "password";

        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");

    }

});
/* ---------- Add To Home Screen ---------- */

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    const installBtn = document.createElement("button");

    installBtn.innerText = "نصب برنامه";

    installBtn.id = "installApp";

    document.body.appendChild(installBtn);

    installBtn.onclick = async () => {

        installBtn.style.display = "none";

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

    };

});
window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("updateModal").style.display="flex";

},1500);

});

document.getElementById("closeModal").onclick=function(){

document.getElementById("updateModal").style.display="none";

};

document.getElementById("downloadBtn").onclick=function(){

window.location.href="YOUR_DOWNLOAD_LINK";

};