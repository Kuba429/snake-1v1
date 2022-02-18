import { socket } from "./main";

export class InfoScreen {
	message: string;
	rootElement: HTMLElement;
	messageElement: HTMLElement;
	readyElement: HTMLElement;
	isSetReady: boolean;
	constructor() {
		this.message = "Game Over";
		this.rootElement = document.querySelector("#infoScreen")!;
		this.messageElement = document.querySelector(".message")!;
		this.readyElement = document.querySelector(".readyIndicator")!;
		this.isSetReady = false;
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
		this.isSetReady = false;
		this.readyElement.classList.remove("active");
	}
	updateMessage(newMessage: string = "Game Over") {
		this.message = newMessage;
		this.messageElement.textContent = this.message;
	}
	setupListeners() {
		const readyButton = document.querySelector(".readyButton");
		readyButton?.addEventListener("click", () => {
			if (!this.isSetReady) {
				this.isSetReady = true;
				socket.socket.emit("ready");
				this.readyElement.classList.add("active");
			}
		});
	}
}
