export class ScoreTracker {
	username: string;
	opponentUsername: string;
	constructor(username: string, opponentUsername: string) {
		this.username = username;
		this.opponentUsername = opponentUsername;
		this.updateUsernames();
	}
	updateUsernames() {
		document.querySelector(".username.player")!.textContent = this.username;
		document.querySelector(".username.opponent")!.textContent =
			this.opponentUsername;
	}
}
