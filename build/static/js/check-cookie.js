    const logOutBtn = document.getElementById("log-out-btn");
    const userProfileBtn = document.getElementById("user-profile-btn");
    const elementToScrollTo = document.getElementById('about');

    if (document.cookie.indexOf("auth")!==-1) {
        logOutBtn.style.display = "block";
        userProfileBtn.style.display = "block";
    }else{
        logOutBtn.style.display = "none";
        userProfileBtn.style.display = "none";
    }

    if (document.cookie.indexOf("noAuth") !==-1) {
        if(elementToScrollTo){
            const y = elementToScrollTo.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }

        // deleteCookieByName("noAuth");
    } else{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
     document.cookie = "noAuth=''; max-age=-1";

    // function deleteCookieByName(name) {
    //     let newCookie = document.cookie.replace(new RegExp(`${name}=[^ ]*( )?`), '');
    //     document.__defineGetter__("cookie", function() {return newCookie} );
    // }




