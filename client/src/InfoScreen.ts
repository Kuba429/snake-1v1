import { socket } from "./main";

export class InfoScreen {
	message: string;
	rootElement: HTMLElement;
	constructor() {
		this.message = "Game Over";
		this.rootElement = document.querySelector("#infoScreen")!;
		this.setupListeners();
		this.showScreen();
	}
	toggleScreen() {
		this.rootElement.classList.toggle("active");
	}
	showScreen() {
		!this.rootElement.classList.contains("active") &&
			this.rootElement.classList.add("active");
	}
	hideScreen() {
		this.rootElement.classList.contains("active") &&
			this.rootElement.classList.remove("active");
	}
	setupListeners() {
		const readyButton = document.querySelector(".readyButton");
		readyButton?.addEventListener("click", () => {
			socket.socket.emit("ready");
		});
	}
}
