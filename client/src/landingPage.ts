import "./styles/landingPage.scss";
import axios from "axios";

const usernameForm = <HTMLFormElement>(
	document?.querySelector("form#usernameForm")
);
const roomForm = document.querySelector("#roomForm")!;
const usernameInput: HTMLInputElement =
	document.querySelector(".usernameInput")!;

const storedUsername = localStorage.getItem("username");
usernameInput!.value =
	storedUsername !== "guest" && storedUsername ? storedUsername : "";

roomForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(<HTMLFormElement>e.target);
	const roomPath = formData.get("room");
	location.replace(`${document.location.origin}/r/${roomPath}`);
});

usernameForm?.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(<HTMLFormElement>e.target);

	localStorage.setItem(
		"username",
		<string>formData.get("username") || "guest"
	);
});

const getActiveRooms = async (): Promise<object> => {
	let activeRooms = await axios({
		baseURL: "http://localhost:5000",
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
	roomList?.appendChild(roomForm);
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
		usernameForm?.dispatchEvent(new Event("submit"));
		location.replace(a.href);
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
