import "./styles/landingPage.scss";
import axios from "axios";

const usernameForm = document.querySelector("form#usernameForm");
usernameForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(<HTMLFormElement>e.target);
    localStorage.setItem("username", <string>formData.get("username"));
});
const getActiveRooms = async () => {
    let activeRooms = await axios({
        baseURL: "http://localhost:5000",
        url: "/activeRooms",
        method: "get",
        headers: { "Content-Type": "application/json" },
    });
    console.log(activeRooms.data);
    return activeRooms.data;
};

