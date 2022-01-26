import "./styles/landingPage.scss";

const usernameForm = document.querySelector("form#usernameForm");
usernameForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(<HTMLFormElement>e.target);
    console.log(formData?.get("username"));
});
