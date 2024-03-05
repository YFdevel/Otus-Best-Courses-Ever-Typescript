const formCreateCourse = document.getElementById("course-form");
const user = document.querySelector(".user");
const avatar = document.querySelector(".input-avatar-download");
const formProfile = document.getElementById("profile-form");
const formProfileButtons = document.querySelectorAll("#profile-form button");
const inputCloseElements = document.querySelectorAll("#profile-form .close-input");

formProfileButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.target.nextElementSibling.style.display = "block";
        e.target.style.display = "none";
    });
});

inputCloseElements.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.target.parentElement.previousElementSibling.style.display = "block";
        e.target.previousElementSibling.value = "";
        e.target.parentElement.style.display = "none";
    });
});

avatar.onchange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar",  e.target.files[0]);
    axios(
        {
            method: "patch",
            url: `/users/avatar/${e.target.getAttribute("data-user")}`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
            },
            data:
                formData
        })
        .then(() => {
            avatar.value="";
            location.reload();
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

formCreateCourse.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formCreateCourse);
    axios(
        {
            method: "post",
            url: '/courses',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data:
                Object.fromEntries(formData.entries())
        })
        .then(() => {
            formCreateCourse.reset();
            location.reload();
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

formProfile.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formProfile);
    let sendingData = {};
    for (let pair of formData.entries()) {
        if (pair[1]) {
            sendingData[pair[0]] = pair[1];
        }
    }
    const bodyData = Object.fromEntries(formData.entries());
    console.log(Object.values(bodyData))
    axios(
        {
            method: "patch",
            url: `/users/${user.value}`,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            data:
            // Object.fromEntries(formData.entries())
                JSON.stringify(sendingData)
        })
        .then(() => {
            formCreateCourse.reset();
            location.reload()
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

