const mainTitle = document.getElementById('main-title');
const mainDesc = document.getElementById('main-desc');
const mainId = document.getElementById('main-id');
const mainVideoLesson = document.getElementById('main-video-lesson');
const commentsContainerMain = document.getElementById('comments-container-main');
const showCommentsBtn = document.getElementById('show-comments-btn');
const commentsForm= document.getElementById('comments-form');

mainTitle.innerText = document.getElementsByClassName('slider-article-title')[0].innerText;
mainDesc.innerText = document.getElementsByClassName('slider-article-desc')[0].innerText;
mainId.innerText = document.getElementsByClassName('slider-article-id')[0].innerText;
mainVideoLesson.innerHTML = document.getElementsByClassName('slider-article-video')[0].innerHTML;
commentsContainerMain.innerHTML = document.getElementsByClassName('comments-container')[0].innerHTML;

async function makeLessonMain(element) {
    mainTitle.innerText = element.getElementsByClassName('slider-article-title')[0].innerText;
    mainDesc.innerText = element.getElementsByClassName('slider-article-desc')[0].innerText;
    mainId.innerText = element.getElementsByClassName('slider-article-id')[0].innerText;
    mainVideoLesson.innerHTML = element.getElementsByClassName('slider-article-video')[0].innerHTML;
    mainVideoLesson.style.height="400px";
    await getComments(mainId.innerText);
    commentsContainerMain.innerHTML = element.getElementsByClassName('comments-container')[0].innerHTML;
}

function hideComments(element) {
    const commentsBlock = element.nextElementSibling;
    commentsBlock.classList.toggle("hidden");
    if (commentsBlock.classList.contains("hidden")) {
        element.getElementsByTagName("span")[0].innerText = "Посмотреть комментарии";
        element.getElementsByTagName("img")[0].src = "/images/downarrow.png";
    } else {
        element.getElementsByTagName("span")[0].innerText = "Скрыть комментарии";
        element.getElementsByTagName("img")[0].src = "/images/arrow_up.png";
    }

}

const getComments = async(id) => {
    try {
        const res = await axios(
            {
                method: "get",
                url: `/comments/lesson/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
    }catch (err) {
        if (err.response) {
            console.log(err.message);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err.message);
        }
    }
};



