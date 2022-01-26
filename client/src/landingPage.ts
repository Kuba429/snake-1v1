import axios from "axios";
import { socket } from "./main";
import "./styles/landingPage.scss";
const usernameForm = document.querySelector("form#usernameForm");
usernameForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(<HTMLFormElement>e.target);
    console.log(formData?.get("username"));
});
const getActiveRooms = async () => {
    let activeRooms = await axios({
        baseURL: "http://localhost:5000",
        url: "/activeRooms",
        method: "get",
        headers: { "Content-Type": "application/json" },
    });
    return activeRooms.data;
};
