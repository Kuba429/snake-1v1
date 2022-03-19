import "./styles/landingPage.scss";
import axios from "axios";

const usernameInput: HTMLInputElement =
    document.querySelector(".usernameInput")!;
const mainForm: HTMLFormElement = document.querySelector("#mainForm")!;

const storedUsername = localStorage.getItem("username");
usernameInput!.value =
    storedUsername !== "guest" && storedUsername ? storedUsername : "";

usernameInput.addEventListener("input", (e) => {
    localStorage.setItem("username", (<HTMLInputElement>e.target).value);
});

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(<HTMLFormElement>e.target);
    const roomPath = formData.get("room");
    localStorage.setItem("username", <string>formData.get("username"));
    location.href = `${document.location.origin}/r/${roomPath}`;
});

const getActiveRooms = async (): Promise<object> => {
    let activeRooms = await axios({
        baseURL: document.location.origin,
        url: "/activeRooms",
        method: "get",
        headers: { "Content-Type": "application/json" },
    });
    return activeRooms.data;
};

const listRooms = async () => {
    const roomList = document.querySelector(".availableRooms");
    //remove all current children in order to avoid listing a room twice
    while (roomList?.firstChild) roomList.removeChild(roomList.firstChild);
    const rooms: object = await getActiveRooms();
    for (let item in rooms) {
        roomList?.appendChild(createListItem(<keyof object>item, rooms));
    }
};

function createListItem<T extends keyof object>(item: T, object: object) {
    // anchor tag
    let a = document.createElement("a");
    a.href = `${document.location.origin}/r/${item}`;
    a.textContent = item;
    a.addEventListener("click", (e) => {
        e.preventDefault();

        location.href = a.href;
    });
    const span = document.createElement("span");
    span.textContent = object[item];

    let li = document.createElement("li");

    a.appendChild(span);
    li.appendChild(a);
    li.classList.add("roomElement");
    return li;
}

listRooms();
