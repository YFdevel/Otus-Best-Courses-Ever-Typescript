const formCreateLesson = document.getElementById("lesson-form");

formCreateLesson.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formCreateLesson);
    axios(
        {
            method: "post",
            url: '/lessons',
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
            },
            data:
                formData
        })
        .then(() => {
            formCreateLesson.reset();
            location.href=`/courses/${formData.get("courseId")}`;
        })
        .catch(function (error) {
            console.log(error.message);
        });
};