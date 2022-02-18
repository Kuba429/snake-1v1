export class ScoreTracker {
	username: string;
	opponentUsername: string;
	constructor() {
		this.username =
			localStorage.getItem("username")?.substring(0, 15) || "Guest";
		this.opponentUsername = "Opponent";
		this.updateUsernames();
	}
	updateUsernames() {
		document.querySelector(".username.player")!.textContent = this.username;
		document.querySelector(".username.opponent")!.textContent =
			this.opponentUsername;
	}
}
