const formLinkUp = document.querySelector(".form-link-up");
const formLinkIn = document.querySelector(".form-link-in");
const formUp = document.querySelector(".auth-form-up");
const formIn = document.querySelector(".auth-form-in");


formLinkUp.addEventListener("click", () => {
    formIn.style.display = "block";
    formUp.style.display = "none";
});

formLinkIn.addEventListener("click", () => {
    formIn.style.display = "none";
    formUp.style.display = "block";
});

